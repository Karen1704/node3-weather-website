const chalk = require("chalk");
const request = require("postman-request");

const geocode = (address = "Yerevan", callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoia2FyZW5naGEiLCJhIjoiY2p1anloYnhsMHcwbzQ5bjdlZGZjZGx2ZSJ9.Pix1xc3UpHHBxzHC032Gkg";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(chalk.red("Unable to connect geocode api"), undefined);
    } else if (body.features.length == 0) {
      callback(chalk.red("Unable to find location"), undefined);
    } else {
      callback(undefined, {
        latitute: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place_name: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
