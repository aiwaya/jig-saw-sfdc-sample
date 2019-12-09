
var express = require('express');
var bodyParser = require('body-parser');

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const SECRET = 'IWAYAAKIHIRO';

async function insert_data(serial_id, temperature, voltage, current, timestamp) {
    try {

        client.connect();


        const query = {
            text: 'INSERT INTO data(serial_id, temperature, voltage, current, timestamp) VALUES($1,$2,$3,$4,$5);',
            value: [serial_id, temperature, voltage, current, new Date(timestamp)]
        };


        client.query('INSERT INTO data(serial_id, temperature, voltage, current, timestamp) VALUES($1,$2,$3,$4,$5);', [serial_id, temperature, voltage, current, new Date(timestamp)], (err, res) => {
            if (err) throw err;
            client.end();
        });

/*
        console.log(serial_id + temperature+voltage+current+timestamp);
        await database.one('INSERT INTO data(serial_id, temperature, voltage, current, timestamp) VALUES($1,$2,$3,$4,$5);',
            [serial_id, temperature, voltage, current, new Date(timestamp)])
            .then(data => {
                return data.id;
            })
            .catch(error => {
                console.log('ERROR:', error); // print error;
            });
            */

    } catch (err) {
        console.log('can not insert record')
        console.error(err);
    }
}


app.post('/things/:serial_id/data', function(req, res) {
    try {
        let access_token = req.header('Authorization').split(' ')[1];
        console.log('access token : ' + access_token);
        console.log(req.body);
        insert_data(req.params.serial_id, req.body.temperature, req.body.voltage, req.body.current, req.body.timestamp);
        res.json({id: 'a'});
    } catch (err) {
    }
})



app.listen(process.env.PORT);