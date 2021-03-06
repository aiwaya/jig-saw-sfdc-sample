var express = require('express');
var bodyParser = require('body-parser');

const {Client} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});
client.connect();

var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const KEY = 'jy4BRHPgIn4t4cWOV4c';

var jsforce = require('jsforce');
var conn = new jsforce.Connection({});

const username = "20190924@demo.com";
const password = "abcd1234";

function auth(req) {
    try {
        let access_token = req.header('Authorization').split(' ')[1];
        if (access_token != KEY) return false;
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

app.post('/things/:serial_no/data', function (req, res) {
    if(!auth(req)) {
        return res.status(401).send({error: 'invalid access token'});
    }

    try {
        var serial_no, v1, v2, v3, v4, v5, v6, v7, v8, v9;
        serial_no = req.params.serial_no;
        v1 = req.body.v1;
        v2 = req.body.v2;
        v3 = req.body.v3;
        v4 = req.body.v4;
        v5 = req.body.v5;
        v6 = req.body.v6;
        v7 = req.body.v7;
        v8 = req.body.v8;
        v9 = req.body.v9;
        var params = [serial_no, v1, v2, v3, v4, v5, v6, v7, v8, v9];

        console.log('data : ' + params);

        client.query('INSERT INTO data(serial_no, v1, v2, v3, v4, v5, v6, v7, v8, v9) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);',
            params, (err, result) => {
                if (err) {
                    console.error(err);
                    //return res.status(400).send({error: err});
                } else {
                    conn.login(username, password, function (err, userInfo) {
                        if (err) {
                            return console.error(err);
                        }

                        conn.sobject("Equipment__c").upsert({
                            serial_no__c: serial_no,
                            v1__c: v1,
                            v2__c: v2,
                            v3__c: v3,
                            v4__c: v4,
                            v5__c: v5,
                            v6__c: v6,
                            v7__c: v7,
                            v8__c: v8,
                            v9__c: v9
                        }, 'serial_no__c', function (err, ret) {
                            if (err || !ret.success) {
                                console.error(err, ret);
                                return res.status(500).send({error: err});
                            }
                            return res.status(201).send();

                        });

                    });
                }
            });


    } catch (err) {
        console.error(err);
        return res.status(500).send({error: err});
    }


})


app.post('/things/:serial_no/alert', function (req, res) {
    if(!auth(req)) {
        return res.status(401).send({error: 'invalid access token'});
    }

    try {

        var serial_no, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24;
        serial_no = req.params.serial_no;
        a1 = req.body.a1;
        a2 = req.body.a2;
        a3 = req.body.a3;
        a4 = req.body.a4;
        a5 = req.body.a5;
        a6 = req.body.a6;
        a7 = req.body.a7;
        a8 = req.body.a8;
        a9 = req.body.a9;
        a10 = req.body.a10;
        a11 = req.body.a11;
        a12 = req.body.a12;
        a13 = req.body.a13;
        a14 = req.body.a14;
        a15 = req.body.a15;
        a16 = req.body.a16;
        a17 = req.body.a17;
        a18 = req.body.a18;
        a19 = req.body.a19;
        a20 = req.body.a20;
        a21 = req.body.a21;
        a22 = req.body.a22;
        a23 = req.body.a23;
        a24 = req.body.a24;

        conn.login(username, password, function (err, userInfo) {
            if (err) {
                return console.error(err);
            }

            conn.sobject("CustomObject2__c").insert({
                Field1__r: {serial_no__c: 'VR-10001'},
                a1__c: a1,
                a2__c: a2,
                a3__c: a3,
                a4__c: a4,
                a5__c: a5,
                a6__c: a6,
                a7__c: a7,
                a8__c: a8,
                a9__c: a9,
                a10__c: a10,
                a11__c: a11,
                a12__c: a12,
                a13__c: a13,
                a14__c: a14,
                a15__c: a15,
                a16__c: a16,
                a17__c: a17,
                a18__c: a18,
                a19__c: a19,
                a20__c: a20,
                a21__c: a21,
                a22__c: a22,
                a23__c: a23,
                a24__c: a24
            }, function (err, ret) {
                if (err || !ret.success) {
                    console.error(err, ret);
                    return res.status(500).send({error: err});
                }
                return res.status(201).send();
            });
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({error: err});
        return;
    }


})


app.listen(process.env.PORT);