# VIO

Compartilhamento de tela para assistir coisas com os amigos — direto do navegador, sem
depender de nenhum servico de terceiros pra transmissao em si. Interface **mobile-first**:
pensada primeiro pro celular (alvos de toque de 44px+, folhas deslizantes, sem estouro de
tela pros lados) e depois adaptada pro desktop. Da pra rodar no seu proprio computador ou
publicar de graca no [Render](https://render.com) — ver as duas opcoes abaixo.

By **NerdQuest Studios**, fundado por **Nine**.

## O que tem

- Salas simples: combine um codigo com os amigos e entrem todos nele.
- **Mais de uma pessoa pode compartilhar ao mesmo tempo** (ou se revezar) na mesma sala.
  Quando ha mais de uma transmissao ativa, aparece uma tira de miniaturas **com video ao
  vivo** de cada uma (nao so o nome) — toque pra trocar o foco. Ver tutorial abaixo.
- Compartilhar a tela inteira ou so uma janela/aba (o navegador mostra o seletor nativo).
- Quem compartilha ve a propria previa ao vivo, com um botao pra ocultar/mostrar ela
  (util se voce compartilhou uma aba/janela que mostra essa mesma pagina, o que causa um
  efeito de espelho infinito).
- Cada espectador controla o proprio volume (slider + mutar), independente dos outros, e
  pode colocar a transmissao em tela cheia — no celular tambem.
- Os controles (volume, tela cheia, tira de transmissoes) somem sozinhos depois de alguns
  segundos sem mexer o mouse ou tocar na tela, pra nao atrapalhar a visualizacao — volta a
  aparecer assim que voce mexe de novo.
- Audio **sem processamento**: sem cancelamento de eco, sem supressao de ruido, sem
  ganho automatico. Ver secao dedicada abaixo.
- Opcao de desligar o audio e mandar so o video.
- Controle de qualidade **ao vivo** (sem precisar parar e comecar de novo): predefinicoes
  Alta / Media / Baixa num seletor de segmentos, ou sliders manuais de FPS, bitrate
  maximo e escala de resolucao — tudo dentro da folha de Ajustes.
- Som distinto quando alguem comeca e quando alguem para de compartilhar — toca pra sala
  inteira, incluindo pra quem acabou de parar.
- Indicador de ping: um pontinho colorido no cabecalho mostra a qualidade da conexao a
  todo momento; tocar nele (ou na folha "Sobre a sala") mostra o numero exato.
- Contador de quanto tempo a sala existe, dentro da folha "Sobre a sala".
- Funciona em celular e computador **para assistir**. Para *compartilhar* a propria tela,
  veja a limitacao importante mais abaixo.

## Como rodar

Requisitos: [Node.js](https://nodejs.org) 18 ou mais recente.

```bash
npm install
npm start
```

Abra `http://localhost:3000` no navegador. Pronto — nessa mesma maquina ja da pra criar
uma sala e testar.

## Publicar no Render (recomendado)

Em vez de rodar no seu computador, da pra hospedar o `server.js` de graca no
[Render](https://render.com) — endereco fixo, HTTPS automatico, e nao depende do seu PC
ou da sua internet ficarem ligados. A troca: no plano gratuito, o servico "dorme" depois
de 15 minutos sem ninguem conectado, e demora uns 30-60 segundos pra acordar na proxima
visita. Isso so acontece se a sala ficar de fato vazia por esse tempo todo — enquanto
tiver alguem com a aba aberta, o proprio indicador de ping do app manda mensagens
periodicas que contam como atividade e evitam o "dormir".

**O que muda em relacao a rodar no seu PC:** nada na experiencia de video/audio — a
transmissao continua sendo direta entre quem compartilha e quem assiste, sem passar pelo
Render (mesma explicacao de sempre: o servidor so cuida da coordenacao da sala).

### Passo a passo

1. **Suba o codigo pro GitHub**, se ainda nao subiu. Com o projeto ja num repositorio
   local:
   ```bash
   git add .
   git commit -m "atualizacoes"
   git push
   ```
   Se for a primeira vez subindo (sem repositorio ainda): crie um repositorio novo em
   [github.com/new](https://github.com/new) e siga as instrucoes que o proprio GitHub
   mostra em "…or push an existing repository from the command line".
2. **Crie uma conta no [Render](https://dashboard.render.com/register)** (gratis, da pra
   entrar com a propria conta do GitHub, sem cartao de credito).
3. **Conecte o repositorio.** No painel, **New** > **Blueprint**, selecione o
   repositorio do VIO. O Render encontra o arquivo `render.yaml` que ja vem no
   projeto e configura o servico sozinho — so confirmar.
   - Sem Blueprint funciona igual: **New** > **Web Service**, selecione o repositorio, e
     preencha manualmente Runtime `Node`, Build Command `npm install`, Start Command
     `npm start`, Instance Type `Free`.
4. **Aguarde o primeiro deploy** (poucos minutos). No final, o Render mostra o endereco
   do servico, algo como `https://vio.onrender.com` — esse e o link fixo pra
   mandar pros amigos, sem precisar mais pegar IP nem rodar tunel.
5. **Dali em diante**, cada `git push` pro GitHub reimplanta a versao nova sozinho.

### Vale saber

- **As salas continuam so na memoria** — se o servico reiniciar (por voce, por
  manutencao do Render, ou por "dormir" apos 15 min vazio) as salas ativas somem, igual
  ja acontecia rodando no seu PC. Nao e uma regressao, e o mesmo comportamento de
  sempre — so quem cria a sala de novo.
- **750 horas gratis por mes**, contadas so enquanto o servico esta ativo (nao enquanto
  "dormindo"). Pra uso pessoal esporadico, dificilmente chega perto disso.
- Se mais tarde quiser um dominio proprio no lugar do `.onrender.com`, o plano gratuito
  do Render ja suporta dominio personalizado com HTTPS automatico — so a compra do
  dominio em si que fica por sua conta.

## Varias pessoas compartilhando na mesma sala

Qualquer participante pode compartilhar a qualquer momento — nao existe um "dono" da
transmissao. Isso abre dois jeitos de usar:

**Ao mesmo tempo:** duas ou mais pessoas apertam "Compartilhar tela" cada uma na sua
janela. Quem esta assistindo ve um pequeno seletor (pilulas com o nome de cada pessoa)
aparecer no topo do video — clicando em um nome, a visualizacao troca pra aquela
transmissao. A primeira transmissao que comecar vira o foco automatico de quem ainda nao
estava vendo nada; as seguintes so aparecem como opcoes adicionais no seletor, sem tirar
ninguem do que ja estava vendo.

**Se revezando:** funciona exatamente como antes — uma pessoa compartilha, para, outra
comeca. Com uma unica transmissao ativa, o seletor nem aparece: so um textinho discreto
com o nome de quem esta compartilhando, no mesmo lugar.

Um detalhe tecnico que vale saber: cada pessoa compartilhando manda seu proprio stream
pra sala inteira (nao so pra quem esta focado nela no momento), entao se muita gente
compartilhar ao mesmo tempo, o consumo de internet de quem esta so assistindo sobe
proporcionalmente — pra um grupo pequeno de amigos, isso raramente e um problema real.

## Alternativa: hospedar no seu proprio computador (sem usar o Render)

Se preferir nao usar o Render, ou so quiser testar com os amigos na mesma casa sem
publicar nada, da pra manter tudo rodando na sua propria maquina. Isso aqui e o que
muda dependendo de onde estao os seus amigos:

### Mesma rede Wi-Fi (ex: todos na sua casa)

Descubra o IP local da maquina que esta rodando o servidor:

- Windows: `ipconfig` (campo "Endereco IPv4")
- Mac/Linux: `ifconfig` ou `ip a` (algo como `192.168.x.x`)

Os amigos acessam `http://SEU-IP-LOCAL:3000` pelo navegador deles, no mesmo Wi-Fi.

> **Atencao:** por regra de seguranca do navegador, `getDisplayMedia` (a funcao que
> captura a tela) so funciona em `localhost` ou em paginas **HTTPS**. Isso significa que
> **assistir** funciona liso em `http://192.168.x.x:3000`, mas se um amigo em *outra*
> maquina tentar **compartilhar a propria tela** por esse endereco, o navegador pode
> bloquear. Quem for compartilhar, o mais simples e usar o tunel abaixo (que ja resolve
> isso de graca).

### Amigos fora da sua rede (a maioria dos casos reais)

A forma mais facil e usar um **tunel** — ele expoe seu servidor local na internet com
HTTPS automatico, sem mexer no roteador:

```bash
# instale o cloudflared (uma vez so) e depois rode:
cloudflared tunnel --url http://localhost:3000
```

Isso gera um link publico tipo `https://algo-aleatorio.trycloudflare.com` que voce manda
pros amigos. Enquanto o comando estiver rodando, a sala esta no ar — o endereco muda se
voce reiniciar o comando (ou se a maquina desligar), entao pra uso esporadico funciona
bem. Pra um endereco fixo de verdade sem depender do seu PC ficar ligado, veja a secao
**Publicar no Render**, mais acima.

Alternativa: encaminhar a porta 3000 no seu roteador (port forwarding) e usar seu IP
publico. Funciona, mas exige acesso ao roteador e o ideal seria ter DNS dinamico, ja que
seu IP publico muda de vez em quando.

*Sobre o que passa pelo tunel:* so a pagina do app e a coordenacao da sala (quem entrou,
quem esta compartilhando). O video e o audio em si viajam **direto** entre os
computadores (peer-to-peer, via WebRTC) — nao passam pelo Cloudflare nem pelo seu
servidor. Por isso a qualidade que voce escolhe afeta diretamente o *upload* de quem
compartilha: com N amigos assistindo, o computador de quem compartilha esta enviando N
copias do stream, uma pra cada um. E exatamente pra isso que os controles de qualidade
existem.

### Se a conexao entre alguns amigos simplesmente nao pegar

Isso costuma acontecer com redes mais restritas (CGNAT, firewalls corporativos, etc). O
app usa servidores STUN publicos do Google pra ajudar a atravessar NAT, o que resolve a
maioria dos casos, mas nao todos. Se precisar de algo mais robusto, o proximo passo e
adicionar um servidor **TURN** (por exemplo rodando [coturn](https://github.com/coturn/coturn)
voce mesmo, ou usando um provedor gratuito/pago) na lista `ICE_SERVERS` em
`public/app.js`. Isso e uma melhoria de infraestrutura, nao muda nada no resto do app.

## Sobre o audio: processamento e o que da pra controlar

### Correcao: audio "respirando" (ficando mais alto e mais baixo sozinho)

Se voce reparou nisso, nao era impressao: por padrao, os navegadores aplicam ao audio
capturado (seja de microfone ou de tela) tres processamentos pensados pra chamadas de
voz — **cancelamento de eco**, **supressao de ruido** e principalmente **ganho automatico**
(AGC), que fica ajustando o volume sozinho pra tentar manter um nivel "constante". E
exatamente esse AGC que costuma causar aquele efeito de "respiracao" que voce descreveu,
porque ele empurra os trechos mais baixos pra cima e os mais altos pra baixo o tempo
todo. Faz sentido pra voz de microfone, mas pra audio de tela (filme, jogo, musica) so
atrapalha.

O app agora pede explicitamente esses tres processamentos **desligados**
(`echoCancellation`, `noiseSuppression` e `autoGainControl` todos `false`) na hora de
capturar a tela, em `public/app.js`. O audio enviado e o audio original, sem
modificacao.

### O que da pra controlar sobre "de onde vem" o audio

Voce pediu pra o app decidir "se compartilhar a janela, o som e so daquela janela; se
compartilhar a tela toda, o som e da tela toda" — isso faz todo sentido, mas vale saber
que **quem decide isso e o navegador/sistema operacional, nao o app**: nenhum navegador
hoje oferece uma API pra isolar o audio de uma janela especifica. Na pratica:

- **Compartilhar uma aba do Chrome/Edge** → o audio vem isolado, so daquela aba. E a
  opcao mais confiavel quando o conteudo com som esta rodando no navegador (Netflix,
  YouTube, Twitch, etc).
- **Compartilhar a tela inteira** → no Windows, com Chrome/Edge, costuma vir com o audio
  geral do sistema. No Mac depende da versao do macOS/Chrome; no Firefox e no Safari, a
  parte de audio do compartilhamento de tela ainda nao e suportada.
- **Compartilhar uma janela especifica** (um app, um jogo) → normalmente **sem** opcao de
  audio nenhuma, em qualquer navegador. Se o som for essencial, a alternativa e
  compartilhar a tela inteira (Windows) ou a aba do navegador, se aplicavel.

O app mostra uma explicacao contextual na tela (perto do controle de audio) assim que
voce escolhe o que compartilhar, dizendo exatamente o que aconteceu com o audio naquele
caso. O toggle "Som da tela" sempre funciona do jeito que voce pediu: liga e desliga o
audio que esta sendo enviado, deixando so o video quando desligado.

## Volume por espectador e tela cheia

O volume e sempre local: cada pessoa que esta assistindo mexe no proprio slider, sem
afetar ninguem mais na sala (nao ha nada pra sincronizar aqui — e literalmente so o
volume da reproducao no seu navegador). O botao de mutar/desmutar funciona em qualquer
aparelho.

O slider de volume, especificamente, **nao funciona no iPhone/iPad**: e uma restricao do
proprio iOS, que so permite ajustar o volume da midia pelos botoes fisicos do aparelho
(nenhum site consegue mudar isso via codigo — o app detecta essa restricao sozinho e
esconde o slider nesse caso, deixando so o botao de mutar). Em Android e computador, o
slider funciona normalmente.

Tela cheia funciona em qualquer plataforma, mas de dois jeitos diferentes por causa de
outra particularidade do iPhone:

- **Computador, Android e iPad**: tela cheia "de verdade", com os controles do app
  (mutar, volume, sair da tela cheia) continuando visiveis por cima do video.
- **iPhone**: o Safari do iPhone so permite colocar o proprio `<video>` em tela cheia
  nativa da Apple — nao um container com controles personalizados por cima. O app
  detecta isso e usa esse modo nativo automaticamente; os controles ficam a cargo da
  interface do proprio iOS nesse caso (ela tem os dela).

## Sobre o celular

**Assistir funciona perfeitamente** em qualquer navegador de celular, incluindo volume
(exceto o slider no iPhone, ver acima) e tela cheia.

**Compartilhar a propria tela pelo navegador do celular nao e possivel hoje** — nem no
Android, nem no iOS. A API que captura a tela (`getDisplayMedia`) simplesmente nao existe
nos navegadores mobile; so em navegadores de computador. Isso nao e uma limitacao deste
app especificamente, e sim de como os navegadores de celular funcionam — mesmo apps
grandes como Zoom/Discord/Meet resolvem isso com um app nativo separado (usando APIs do
proprio sistema, tipo o ReplayKit do iOS), o que foge do escopo de um app web como este.
Na pratica: quem for compartilhar entra pelo computador; quem for so assistir pode
entrar tranquilamente pelo celular. Por isso a previa (ver a propria tela) tambem so
existe no computador — e uma consequencia direta dessa mesma limitacao, nao e algo que
foi deixado de fora do celular por escolha.

## Indicador de ping

O icone de wifi no cabecalho mostra a latencia atual — passe o mouse por cima no
computador, ou toque nele no celular. Ele prioriza o numero mais util em cada momento:

- Se ha uma transmissao em foco (voce assistindo ou compartilhando), mostra o RTT real
  dessa conexao de video (via `RTCPeerConnection.getStats()`) — a medida mais relevante,
  porque reflete o caminho que o video/audio realmente percorre.
- Se ninguem esta compartilhando ainda, cai pro ping do servidor de sinalizacao, so pra
  ter algum numero de referencia.

A cor do icone acompanha a faixa: abaixo de 100 ms fica na cor de "ao vivo", entre 100 e
250 ms fica em amarelo, acima disso fica em vermelho.

## Estrutura do projeto

```
vio/
├── package.json
├── server.js          servidor de sinalizacao (Express + Socket.IO)
├── render.yaml         configuracao de deploy pro Render (blueprint)
└── public/
    ├── index.html      as duas telas do app (entrar / sala)
    ├── style.css        visual: mobile-first, marca em #2727F5, tudo em variaveis CSS
    ├── app.js           toda a logica: sinalizacao, WebRTC, qualidade, audio, ping
    └── icons/           icones SVG usados na interface (recoloridos via CSS mask)
```

As salas ficam so na memoria do servidor — reiniciar o servidor esvazia todas (e reseta
o contador de tempo da sala).

### Sobre o visual

CSS escrito mobile-first de verdade: tudo fora de media query e a base pra celular
(alvos de toque de pelo menos 44px, sem `<select>` nativo nem checkbox cru — os
controles de qualidade viraram um seletor de segmentos, o "Som da tela" virou um
interruptor), e o desktop entra por cima via `min-width`, nao o contrario. Os paineis
secundarios (Ajustes, Participantes, Sobre a sala) sao "folhas" que deslizam de baixo no
celular e viram paineis ancorados perto do botao que os abriu no desktop — o mesmo HTML
serve os dois casos, so a apresentacao muda via CSS.

A fonte e a [Poppins](https://fonts.google.com/specimen/Poppins), carregada via Google
Fonts (precisa de internet a primeira vez que a pagina carrega — igual precisa pra
`npm install`; depois disso o navegador guarda em cache). Numeros/leituras tecnicas
(codigo da sala, ping, estatisticas de qualidade) continuam em fonte monoespacada, pra
manter aquele contraste visual entre "interface" e "dado tecnico".

Quando mais de uma pessoa esta compartilhando, a tira de miniaturas mostra o video ao
vivo (mudo) de cada transmissao, nao so o nome — da pra ver o que cada um esta
mostrando antes de trocar o foco.

## Possiveis proximos passos

Fora do escopo do que foi pedido, mas naturais de acrescentar depois:

- Chat de texto ou microfone (voz) entre os participantes.
- Conectar cada transmissao so a quem esta de fato assistindo ela no momento, em vez de
  toda transmissao ir pra sala inteira — economiza banda quando varias pessoas
  compartilham ao mesmo tempo para um grupo grande.
- Gravar a sessao.
- Servidor TURN (proprio ou de algum provedor gratuito/pago), pra conexao mais robusta
  com redes mais restritas — nao esta configurado agora de proposito; a lista
  `ICE_SERVERS` em `public/app.js` e o lugar pra adicionar depois, e as credenciais
  entrariam como variavel de ambiente no Render, nunca direto no codigo.
- Empacotar como aplicativo instalavel (Electron/Tauri) — atencao: isso sozinho nao
  resolve a limitacao de audio por janela, que exigiria codigo nativo especifico por
  sistema operacional.
