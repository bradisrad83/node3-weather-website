const path = require("path");
const express = require("express");
const hbs = require("hbs");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Brad Goldsmith"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Brad Goldsmith"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Brad Goldsmith",
    message: "This page is under construction"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    console.log("You must provide an address");
    return res.send({
      error: "You must provide an address"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });
      forecast(latitude, longitude, (err, forecastData) => {
        if (err) return res.send({ err });
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term"
    });
  }
  console.log(req.query);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
    name: "Brad Goldsmith"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found",
    name: "Brad Goldsmith"
  });
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
