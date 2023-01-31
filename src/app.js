const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./forecast");
const geocode = require("./geocode");

const app = express();

//Define paths fo Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup  satatic directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Karen Ghalachyan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Karen Ghalachyan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    name: "Karen Ghalachyan",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "Karen Ghalachyan",
    errorMessage: "Help article not found",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }
  geocode(address, (error, { latitute, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitute, longitude, (error, forecastData) => {
      if (error) {
        return res.send(error);
      }
      res.send({
        forecast: forecastData,
        address: address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Karen Ghalachyan",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
