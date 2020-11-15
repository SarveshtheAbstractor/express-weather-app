const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const openweathermap = require("./utils/openweatherapi");
const cl = console.log;
const port = process.env.PORT || 3000;

/**
 * Defined Paths for public directory and templates directory using
 * path module
 */
const publicDirectory = path.join(__dirname, "../public");
const templatesDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

const app = express();

/**
 * Using static directory to serve files like html,css and js and also Images
 */
app.use(express.static(publicDirectory));

/**
 * Setting Up a new Engine and setting it to HandleBars
 * and also setting the templatesDirectory
 */
app.set("view engine", "hbs");
app.set("views", templatesDirectory);
hbs.registerPartials(partialsDirectory);
/**
 * Setting up the Necessary Routes for home, help, about and Weather
 * Weather is our back end to serve JSON
 */
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sarvesh Hiwase",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Sarvesh Hiwase",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Sarvesh Hiwase",
  });
});

app.get("/weather", (req, res) => {
  const city = req.query.address;
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address term",
    });
  }
  async function getDetails() {
    const geocodeDetails = await geocode(city);
    if (typeof geocodeDetails === "object") {
      const openweatherDetails = await openweathermap(geocodeDetails);
      openweatherDetails.address = city;
      res.send(openweatherDetails);
    } else {
      res.send({
        error: "Unable to find location you searched for!",
      });
    }
  }
  getDetails();
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sarvesh Hiwase",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sarvesh Hiwase",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  cl("sarvesh server is started");
});
