const axios = require("axios");

async function geocode(address) {
  const access_token =
    "pk.eyJ1IjoiaXRhY2hpMDcxOCIsImEiOiJja2hlejdtdjEwNndsMzBtMm03N3Z3Z21zIn0.zFxJGhSnxkNPerkQ71M11g";

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${access_token}&limit=1`;
  const JSONData = await axios(url);
  let reqDetails;
  if (!JSONData.isAxiosError) {
    reqDetails = JSONData.data;
  } else {
    return "Unable to connect location service";
  }

  if (reqDetails.features.length === 0) {
    return "Unable to find location";
  } else {
    return {
      latitude: reqDetails.features[0].center[1],
      longitude: reqDetails.features[0].center[0],
      placename: reqDetails.features[0].place_name,
    };
  }
}
module.exports = geocode;
