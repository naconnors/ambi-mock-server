const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/events', eventsHandler)

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Facts Events service listening at http://localhost:${PORT}`);
})

function eventsHandler(request, response, next) {

    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };

    response.writeHead(200, headers);

    setInterval(function() {
        let reading = getNewReading();
        console.log(reading)
        const data = `data: ${JSON.stringify(reading)}\n\n`;
        response.write(data);
    }, 2000)

  
    const clientId = Date.now();
  
    request.on('close', () => {
      console.log(`${clientId} Connection closed`);
    });
  }
  
function getNewReading() {
    return {
        "id": uuidv4(),
        "temperature": getRandomTemp().toFixed(2),
        "humidity": getRandomHumidity().toFixed(2),
        "dust_concentration": getRandomDustConcentration().toFixed(2),
        "pressure": getRandomPressure().toFixed(2),
        "air_purity":"Dangerous Pollution"
    }   
}

function getRandomTemp() {
    let maxTemp = 12000;
    let randInt = Math.floor(Math.random() * maxTemp);
    return randInt/100;
}

function getRandomHumidity() {
    let maxHumidity = 10000;
    let randInt = Math.floor(Math.random() * maxHumidity);
    return randInt/100;
}

function getRandomDustConcentration() {
    let maxDust = 20000;
    let randInt = Math.floor(Math.random() * maxDust);
    return randInt/100;
}

function getRandomPressure() {
    let maxPressure = 100000;
    let randInt = Math.floor(Math.random() * maxPressure);
    return randInt/100;
}