const https = require('https');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){

  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){

  const query = req.body.cityName;
  const apiKey = '[insert api key]';
  const units = 'imperial';
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units='+ units;

  https.get(url, function(response){
    console.log('Status Code', response.statusCode);

    response.on('data', function(data){
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      console.log('Temp(F): ', temp);

      const weatherDesc = weatherData.weather[0].description;
      console.log('Description: ', weatherDesc);

      const icon = weatherData.weather[0].icon;
      console.log('Icon: ', icon);

      const imgURL = 'https://openweathermap.org/img/wn/'+ icon +'@2x.png';
      console.log('Image URL: ', imgURL);

      res.write('<h1>The temperature in ' + query + ' is ' + temp + ' degrees fahrenheit</h1>');
      res.write('<p>The weather is currently ' + weatherDesc + "</p>");
      res.write('<img src=' + imgURL +'>')
      res.send();
    });
  });
});

app.listen(3000, function(){
  console.log('Server is listening on port 3000');
});
