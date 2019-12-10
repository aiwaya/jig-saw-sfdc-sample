
var express = require('express');
var bodyParser = require('body-parser');

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});
client.connect();

var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const SECRET = 'IWAYAAKIHIRO';





app.post('/things/:serial_id/data', function(req, res) {
    let access_token = req.header('Authorization').split(' ')[1];
    console.log('access token : ' + access_token);
    let serial_id, temperature, voltage, current, timestamp;
    try {
        serial_id = req.params.serial_id;
        temperature = req.body.temperature;
        voltage = req.body.voltage;
        current = req.body.current;
        timestamp = req.body.timestamp;
    } catch (err) {
        res.status(500).send({id: 'udasdad'});
    }

    client.query('INSERT INTO data(serial_id, temperature, voltage, current, timestamp) VALUES($1,$2,$3,$4,$5);',
        [serial_id, temperature, voltage, current, new Date(timestamp)], (err, result) => {
            if (err) {
                console.err(err);
                res.status(500);
                res.send('assa');

            } else {
                res.status(201).send();
            }
        });
})



app.listen(process.env.PORT);