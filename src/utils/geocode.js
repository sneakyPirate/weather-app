const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYW5raXRtc3JhIiwiYSI6ImNrOXMwYjh4YTB0Z2YzZWx6ZmNqdGVpdGcifQ.Nf6BJo1BTqipflVgRVYsOw";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Connection failed!");
    } else if (body.features.length === 0) {
      callback("No match found!");
    } else {
      const dataArr = [];
      // callback(undefined, () => {
      //   body.features.forEach((element) => {
      //     const obj = {
      //       Lat: element.center[1],
      //       Lon: element.center[0],
      //       Place: element.place_name,
      //     };
      //     //console.log(element.place_name)
      //     dataArr.push(obj);
      //     //console.log(dataArr)
      //   });
      //   return undefined, dataArr[0];
      // });

      callback(undefined, {
        Lat: body.features[0].center[1],
        Lon: body.features[0].center[0],
        Place: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
