<div align="center">

<h1> ClimaCep</h1>
  <span>
    Uma atividade para a disciplina de Sistemas distribuidos que implementa os conceitos de api gateway e websocket
  </span><br><br>
  <div align="center">
      <a href="#spiral_notepad-sobre-o-projeto">Sobre o projeto</a> •
      <a href="#gear-requisitos">Requisitos</a> •
      <a href="#rocket-executar-o-projeto">Executar o projeto</a> •
  </div>
  <div align="center" style="margin-top:16px">
    <img src="https://img.shields.io/static/v1?label=Documentation&message=Swagger%20UI&color=85EA2D&style=for-the-badge&logo=swagger" />
    <img src="https://img.shields.io/static/v1?label=Node.js&message=Express&color=339933&style=for-the-badge&logo=node.js" />
    <img src="https://img.shields.io/static/v1?label=HTTP%20Client&message=Axios&color=5A29E4&style=for-the-badge&logo=axios" />
    <img src="https://img.shields.io/static/v1?label=WebSocket&message=Real-time&color=010101&style=for-the-badge&logo=websocket" />
</div>

## :spiral_notepad: Sobre o projeto

> É uma aplicação web que integra informações de códigos postais (CEP) e condições climáticas. Com o WeatherCEP, você pode facilmente obter dados detalhados sobre um endereço específico usando o CEP fornecido e verificar as condições meteorológicas atuais para a cidade associada a esse CEP.

> [Assista ao vídeo de demonstração](https://youtu.be/izP8mmUpHQo)

### :gear: Requisitos

Para executar o projeto localmente é preciso ter algumas tecnologias e bibliotecas instaladas. A seguir os comandos que precisam ser executados:

```

# Clone o repositório do projeto
git clone https://github.com/dassaev-lima/CepClima.git

# Entre no diretório do projeto
cd CepClima

# Instale as dependências do Node.js
npm install

```

Você precisará criar um arquivo `.env` no seu projeto com a seguinte variável:

```
OPENWEATHER_API_KEY= your_api_key
```

para gerar essa chave basta criar uma conta no site https://openweathermap.org/ e gerar uma chave para poder consumir a API

### :rocket: Executar o projeto

Após instalar todas as dependencias do projeto execute o seguinte comando, e abra o arquivo websocket-client.html

```
node server.js
```
