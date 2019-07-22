const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/4a46b5a408a2ec262ddd4c68d389af8a/" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather Services!", undefined);
    } else if (body.error) {
      callback(
        "Unable to Find Location.  Please enter new coordinates",
        undefined
      );
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It's currently " +
          body.currently.temperature +
          " degrees out.  There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
