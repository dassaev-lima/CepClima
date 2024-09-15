// server.js
require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const viaCepService = require("./services/viaCepService");
const openWeatherService = require("./services/openWeatherService");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Carrega o arquivo swagger.json
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs", "swagger.json"), "utf8")
);

// Usa o swagger-ui-express para servir a documentação na rota /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Cliente conectado");
  ws.send(
    "Bem-vindo ao ClimaCep! Digite seu cep para saber a previsão do tempo"
  );

  // Quando o servidor recebe uma mensagem do cliente
  ws.on("message", async (message) => {
    // Importação dinâmica de `node-fetch`
    const fetch = (await import("node-fetch")).default;

    try {
      const response = await fetch(`http://localhost:3000/address/${message}`);
      const data = await response.json();

      const windSpeed = (data.climate.wind.speed * 3.6).toFixed(2);
      const climateInformation = `Confira as informações: <br> <br>

      Logradouro: ${data.address.logradouro} <br>
      Bairro: ${data.address.bairro} <br>
      Localidade: ${data.address.localidade} <br>
      Descrição do clima: ${data.climate.weather[0].description} <br>
      Temperatura: ${data.climate.main.temp} °C <br>
      Sensação térmica: ${data.climate.main.feels_like} °C <br>
      Umidade: ${data.climate.main.humidity} % <br>
      Vento: ${windSpeed} KM/h
      
      `;
      ws.send(climateInformation);
    } catch {
      ws.send("Houve um erro, por favor tente inserir um cep válido");
    }
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

app.get("/address/:cep", async (req, res) => {
  const cep = req.params.cep;

  try {
    // Consultando a API ViaCEP
    const address = await viaCepService.getAddress(cep);

    // Verificando se o CEP é válido
    if (address.erro) {
      return res.status(404).json({ message: "CEP não encontrado" });
    }

    // Consultando a API do OpenWeather usando a cidade do endereço
    const climate = await openWeatherService.getClimate(address.localidade);

    // Retornando os dados com HATEOAS
    res.json({
      address,
      climate,
      links: {},
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar informações", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
  console.log("Servidor WebSocket rodando na porta 8080");
  console.log("Documentação disponível em http://localhost:3000/api-docs");
});
