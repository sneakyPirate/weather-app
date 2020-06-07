const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");

//Define Geocode and Forecast modules
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const port = process.env.PORT || 3000;

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

//Define paths for express config
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine, partials and views location
app.set("view engine", "hbs"); //default views folder is referenced to VIEWS folder
app.set("views", viewsPath); //for custom VIEWS folder, e.g. TEMPLATES, need be specified
hbs.registerPartials(partialsPath); //register partials

//Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather HBS",
    name: "sPirate",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "sPirate",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help HBS page",
    name: "sPirate",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help article not found!",
    name: "sPirate",
  });
});

//Weather module
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address input!",
    });
  }

  geocode(req.query.address, (error, { Lat, Lon, Place } = {}) => {
    if (error) {
      return res.send({
        error: "Error fetching geoLocation, try another location",
      });
    }
    forecast(Lat, Lon, (error, fData) => {
      if (error) {
        return res.send({
          error: "Error fetching forecast",
        });
      }
      //console.log('Error: ',error);
      return res.send({
        // gData: geoData(),
        Place,
        // address: req.query.address,
        Forecast: fData,
      });
    });
  });
  // res.send({
  //   Forecast: "Partly Cloudy",
  //   location: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "No search input provided.",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found!",
    name: "sPirate",
  });
});

app.listen(port, () => {
  console.log(`App Express started @ port...`, port);
});
