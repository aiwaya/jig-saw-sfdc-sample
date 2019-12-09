
var express = require('express');
var jwt = require('jsonwebtoken');

const pgPromise = require('pg-promise')({noWarnings: true});
const databaseURL = process.env.DATABASE_URL;
const database = pgPromise(databaseURL);

var app = express();


async function insert_data() {
    try {
        var res = await database.any('INSERT INTO data(thing_id, value, timestamp) VALUES($1,$2, $3);', ['1', 1, new Date()]);
        console.log(res);
    } catch (err) {
        console.log('can not update record')
        console.error(err);
    }
}

app.get('/', function(req, res){
    res.send("Welcome to our API");
})

app.get('/token', function(req, res){
    var token = jwt.sign({username:"ado"}, 'supersecret',{expiresIn: 120});
    res.send(token)
})

app.get('/api', function(req, res){
    var token = req.query.token;
    jwt.verify(token, 'supersecret', function(err, decoded){
        if(!err){
            insert_data();

            var secrets = {"accountNumber" : "938291239","pin" : "11289","account" : "Finance"};
            res.json(secrets);
        } else {
            res.send(err);
        }
    })
})




app.listen(process.env.PORT);