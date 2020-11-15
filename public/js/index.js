const cl = console.log;
const submitButton = document.getElementById("submitbutton");
const weatherdiv = document.getElementById("weather");
cl("Client Side file is loaded");

submitButton.addEventListener("click", () => {
  let query = document.getElementById("weatherinput").value;
  weatherdiv.textContent = "Loading ...";
  getWeatherDetails(query);
  document.getElementById("weatherinput").value = "";
});

async function getWeatherDetails(query) {
  const res = await fetch(`http://localhost:3000/weather?address=${query}`);
  const data = await res.json();
  if (data.error) {
    weatherdiv.textContent = data.error;
  } else {
    const stringTemplate = `Weather in ${data.placename} is ${data.weather} and temperature is ${data.temp} `;
    weatherdiv.textContent = stringTemplate;
  }
}
