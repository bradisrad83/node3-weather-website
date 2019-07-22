const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYmVyZWFkaXNyYWQ4MyIsImEiOiJjanlhMXk5NjIwYWZrM2JtcGQ5M2w2eWxtIn0.YsxGMcIdg8aBJkbFsMAKkA&limit=1";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to Location Services!", undefined);
    } else if (response.body.features.length < 1) {
      callback("Unable to Geocade address.  Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
