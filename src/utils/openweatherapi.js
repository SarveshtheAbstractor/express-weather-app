const axios = require("axios");

async function openweathermap(positions) {
  //Necessary Declaration
  const lati = positions.latitude;
  const long = positions.longitude;
  const placename = positions.placename;

  const apikey = "3265874a2c77ae4a04bb96236a642d2f";

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${apikey}`;

  const JSONdata = await axios(url);
  const reqDetails = JSONdata.data;
  if (reqDetails.cod === 404) {
    return "Unable to find Location";
  } else {
    return {
      weather: reqDetails.weather[0].main,
      temp: reqDetails.main.temp,
      placename: placename,
    };
  }
}

module.exports = openweathermap;
