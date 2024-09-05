// openWeatherService.js
const axios = require("axios");

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const getClima = async (cidade) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao consultar OpenWeather: ${error.message}`);
  }
};

module.exports = {
  getClima,
};
