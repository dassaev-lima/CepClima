// viaCepService.js
const axios = require("axios");

const getAddress = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao consultar ViaCEP: ${error.message}`);
  }
};

module.exports = {
  getAddress,
};
