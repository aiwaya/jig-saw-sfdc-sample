
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
    console.log('a');
    let access_token = req.header('Authorization').split(' ')[1];
    console.log('b');
    if(access_token != 'abcd') {
        res.status(401).send({error: 'invalid access token'});
        console.error('invalid access token');
        return;
    }
    console.log('c');

    var serial_id, temperature, voltage, current, timestamp;
    try {
        serial_id = req.params.serial_id;
        console.log('1');
        temperature = req.body.temperature;
        console.log('2');
        voltage = req.body.voltage;
        console.log('3');
        current = req.body.current;
        console.log('4');
        timestamp = req.body.timestamp;
    } catch (err) {
        console.error(err);
        res.status(400).send({error: err});
        return;
    }

    client.query('INSERT INTO data(serial_id, temperature, voltage, current, timestamp) VALUES($1,$2,$3,$4,$5);',
        [serial_id, temperature, voltage, current, new Date(timestamp)], (err, result) => {
            if (err) {
                console.error(err);
                res.status(400).send({error: err});
            } else {
                res.status(201).send();
            }
        });
})



app.listen(process.env.PORT);