// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const viaCepService = require("./services/viaCepService");
const openWeatherService = require("./services/openWeatherService");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/endereco/:cep", async (req, res) => {
  const cep = req.params.cep;

  try {
    // Consultando a API ViaCEP
    const endereco = await viaCepService.getEndereco(cep);

    // Verificando se o CEP é válido
    if (endereco.erro) {
      return res.status(404).json({ message: "CEP não encontrado" });
    }

    // Consultando a API do OpenWeather usando a cidade do endereço
    const clima = await openWeatherService.getClima(endereco.localidade);

    // Retornando os dados com HATEOAS
    res.json({
      endereco,
      clima,
      links: {},
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar informações", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
