import express from 'express';
import https from 'node:https';
import path from 'path';
import bodyParser from 'body-parser'
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'views/weather.html'));
})
app.post('/', (req, res) => {
  const city = req.body.city;
  const apiKey = "5adb069f4176e4f1851f5cc21c2c1c40";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  https.get(url, response => {
    response.on("data", data => {
      const weatherData = (JSON.parse(data));
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      res.write(`<h1>The temperature in ${city} is  ${temp} degree celsius</h1>`);
      res.write(`Weather description of ${city} : ${description}</p>`);
      const weatherIcon = weatherData.weather[0].icon;
      const weatherIconURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      res.write("<img src='" + weatherIconURL + "'/>")
      res.send();
    })
  });
  // res.send("Building the weather app !")
})
app.listen(2000);