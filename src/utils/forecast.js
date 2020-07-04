const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=en&appid=9f2e013d89fc84a695329bbac03c9c10`;

    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.message) {
            callback("URL ma locho 6e baka!", undefined)
        } else {
            callback(undefined, `It is currently ${body.current.temp} degrees out. ${body.daily[0].weather[0].description}`);
        }
    })
};

module.exports = forecast;