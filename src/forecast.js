const chalk = require("chalk");
const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0c4b29dec56a5b4a2e9b2e93f125ac75&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(chalk.red("Unable to connect to weather service"), undefined);
    } else if (body.error) {
      callback(chalk.red(body.error.info), undefined);
    } else {
      callback(
        undefined,
        "Curent temperature in " +
          body.location.name +
          " is " +
          body.current.temperature +
          " degrees"
      );
    }
  });
};

module.exports = forecast;
