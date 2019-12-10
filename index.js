
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




function insert_data(res1, serial_id, temperature, voltage, current, timestamp) {
    client.query('INSERT INTO data(serial_id, temperature, voltage, current, timestamp) VALUES($1,$2,$3,$4,$5);',
        [serial_id, temperature, voltage, current, new Date(timestamp)], (err, res) => {
            if (err) {
                res1.status(500).send();

            } else {
                res1.status(201).send();
            }
        });
}


app.post('/things/:serial_id/data', function(req, res) {

        let access_token = req.header('Authorization').split(' ')[1];
        console.log('access token : ' + access_token);

        insert_data(res, req.params.serial_id, req.body.temperature, req.body.voltage, req.body.current, req.body.timestamp);

})



app.listen(process.env.PORT);