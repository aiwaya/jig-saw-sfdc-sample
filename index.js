
var express = require('express');
var bodyParser = require('body-parser');
const pgPromise = require('pg-promise')({noWarnings: true});
const databaseURL = process.env.DATABASE_URL;
const database = pgPromise(databaseURL);

var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const SECRET = 'IWAYAAKIHIRO';

async function insert_data(thing, value, timestamp) {
    try {
        await database.one('INSERT INTO data(thing_id, value, timestamp) VALUES($1,$2, $3)  RETURNING id;', [thing, value, new Date(timestamp)])
            .then(data => {
                return data.id;
            })
            .catch(error => {
                console.log('ERROR:', error); // print error;
            });
    } catch (err) {
        console.log('can not insert record')
        console.error(err);
    }
}


app.post('/things/:thing/data', function(req, res){
    let access_token = req.header('Authorization').split(' ')[1];
    console.log('access token : ' + access_token);
    jwt.verify(access_token, SECRET, function(err, decoded){
        console.log('enter verfiy with err' + err);
        if(!err){
            console.log('ok');
            var thing = req.params.thing;
            var timestamp = req.body.timestamp;
            var value = req.body.value;
            let inserted_id = insert_data(thing, value, timestamp);
            console.log(inserted_id);
            res.json({id: inserted_id});
        } else {
            console.log('ng');
            res.json({message: 'Token is not valid'});
        }
    })
})



app.listen(process.env.PORT);