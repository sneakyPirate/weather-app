const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/forecast?access_key=8259feb5173b340124db6d6b8e653a8e&query=" +
    lat +
    "," +
    long +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("No Connection", undefined);
    } else if (body.error) {
      console.log(body);
      console.log("Unable to fetch data for mentioned coordinates", undefined);
    } else {
      //const body = body;
      
      callback(
        undefined,
        `${body.current.weather_descriptions[0]} and feels like ${body.current.feelslike}`
      );
    }
  });
};

module.exports = forecast;
