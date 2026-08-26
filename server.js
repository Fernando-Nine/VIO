// server.js
//
// Servidor de sinalizacao. Ele NAO transporta video/audio - so ajuda os
// participantes a se encontrarem e trocarem as mensagens WebRTC (offer,
// answer, ICE candidates). O video e o audio em si viajam direto entre os
// computadores (peer-to-peer), o que e o motivo de a qualidade escolhida
// impactar diretamente o upload de quem esta compartilhando.
//
// Mais de uma pessoa pode compartilhar ao mesmo tempo na mesma sala: o
// servidor so guarda um conjunto (Set) de quem esta no ar, sem escolher
// "o" apresentador. Cada espectador decide, do lado do navegador, qual
// transmissao quer ver em foco.

const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Estado das salas, tudo em memoria (some quando o servidor reinicia).
// rooms: Map<roomId, { participants: Map<socketId, {name}>, sharingIds: Set<socketId>, criadaEm: number }>
const rooms = new Map();

function getOrCreateRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, { participants: new Map(), sharingIds: new Set(), criadaEm: Date.now() });
  }
  return rooms.get(roomId);
}

function roomState(room) {
  return {
    participants: [...room.participants.entries()].map(([id, p]) => ({ id, name: p.name })),
    sharingIds: [...room.sharingIds],
    criadaEm: room.criadaEm,
  };
}

io.on('connection', (socket) => {
  let currentRoomId = null;

  socket.on('join-room', ({ roomId, name }) => {
    if (!roomId || typeof name !== 'string' || !name.trim()) return;
    roomId = String(roomId).trim().toUpperCase().slice(0, 12);
    currentRoomId = roomId;
    socket.join(roomId);

    const room = getOrCreateRoom(roomId);
    room.participants.set(socket.id, { name: name.trim().slice(0, 40) });

    // Manda pro recem-chegado o estado atual da sala
    socket.emit('room-state', roomState(room));

    // Avisa os outros que alguem entrou (quem estiver compartilhando vai
    // reagir a esse evento criando uma nova conexao para o novo participante)
    socket.to(roomId).emit('participant-joined', { id: socket.id, name: name.trim() });
  });

  socket.on('start-share', () => {
    const room = rooms.get(currentRoomId);
    if (!room) return;
    room.sharingIds.add(socket.id); // varias pessoas podem estar aqui ao mesmo tempo
    io.to(currentRoomId).emit('share-started', { id: socket.id });
  });

  socket.on('stop-share', () => {
    const room = rooms.get(currentRoomId);
    if (!room || !room.sharingIds.has(socket.id)) return;
    room.sharingIds.delete(socket.id);
    io.to(currentRoomId).emit('share-stopped', { id: socket.id });
  });

  // Relay generico de sinalizacao WebRTC (offer / answer / ice candidate).
  // O servidor so repassa o payload para o destinatario certo, sem entender
  // (nem precisar entender) o conteudo.
  socket.on('signal', ({ to, payload }) => {
    if (!to || !payload) return;
    io.to(to).emit('signal', { from: socket.id, payload });
  });

  // Usado pelo indicador de ping no cliente: so responde na hora, o tempo de
  // ida e volta e medido no proprio navegador. Serve de fallback para quando
  // ainda nao existe nenhuma conexao WebRTC ativa pra medir (nesse caso o
  // cliente prefere o ping "de verdade" da conexao de video).
  socket.on('ping-teste', (callback) => {
    if (typeof callback === 'function') callback();
  });

  socket.on('disconnect', () => {
    if (!currentRoomId) return;
    const room = rooms.get(currentRoomId);
    if (!room) return;

    room.participants.delete(socket.id);

    if (room.sharingIds.has(socket.id)) {
      room.sharingIds.delete(socket.id);
      socket.to(currentRoomId).emit('share-stopped', { id: socket.id });
    }

    socket.to(currentRoomId).emit('participant-left', { id: socket.id });

    if (room.participants.size === 0) rooms.delete(currentRoomId);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const hostnameRender = process.env.RENDER_EXTERNAL_HOSTNAME; // definido automaticamente pelo Render, so em producao la
  console.log('\nVIO rodando!');
  if (hostnameRender) {
    console.log(`Endereco publico: https://${hostnameRender}`);
  } else {
    console.log(`Acesse no seu computador: http://localhost:${PORT}`);
    console.log('(veja o README para acessar do celular ou de fora da sua rede)');
  }
  console.log('');
});
