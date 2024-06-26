const express = require('express');
const app = express();
const port = 9999;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getWeather', (req, res) => {
    // из реквеста забрать город
    //залесь в базу данных и узнать из базы данных погоду для этого города
    // res отправить 
    res.send('{
        "coord": {
          "lon": -0.1257,
          "lat": 51.5085
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "base": "stations",
        "main": {
          "temp": 23.19,
          "feels_like": 23.11,
          "temp_min": 20.58,
          "temp_max": 24.54,
          "pressure": 1018,
          "humidity": 59
        },
        "visibility": 10000,
        "wind": {
          "speed": 3.09,
          "deg": 230
        },
        "clouds": {
          "all": 100
        },
        "dt": 1719161704,
        "sys": {
          "type": 2,
          "id": 2093698,
          "country": "GB",
          "sunrise": 1719114221,
          "sunset": 1719174106
        },
        "timezone": 3600,
        "id": 2643743,
        "name": "London",
        "cod": 200
      }');
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});