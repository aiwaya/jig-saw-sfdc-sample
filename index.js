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

const KEY = process.env.KEY;

var jsforce = require('jsforce');
var conn = new jsforce.Connection({});

const username = "20190924@demo.com";
const password = "abcd1234";

app.post('/things/:serial_no/data', function (req, res) {
    let access_token = req.header('Authorization').split(' ')[1];
    if (access_token != KEY) {
        res.status(401).send({error: 'invalid access token'});
        console.error('invalid access token');
        return;
    }


    try {
        /*
         v1:総カウント
         v2:送信時の日時
         v3:包装設定（標準、密封）
         v4:接着力右（１、２、３、４、５）
         v5:接着力左（１、２、３、４、５）
         v6:切断力（１、２、３、４、５）
         v7:処理速度（１、２、３）
         v8:基盤品番
         v9:ソフトVer.
         */

        let serial_no, v1, v2, v3, v4, v5, v6, v7, v8, v9;
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
                    return console.error(err, ret);
                }

                client.query('INSERT INTO data(serial_no, v1, v2, v3, v4, v5, v6, v7, v8, v9) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);',
                    [serial_no, v1, v2, v3, v4, v5, v6, v7, v8, v9], (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(400).send({error: err});
                        } else {
                            return res.status(201).send();
                        }
                    });
            });

        });


        /*
         client.query('INSERT INTO data(serial_no, v1, v2, v3, v4, v5, v6, v7, v8, v9) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);',
         [serial_no, v1, v2, v3, v4, v5, v6, v7, v8, v9], (err, result) => {
         if (err) {
         console.error(err);
         res.status(400).send({error: err});
         } else {
         res.status(201).send();
         }
         });
         */
    } catch (err) {
        console.error(err);
        res.status(400).send({error: err});
        return;
    }


})


app.post('/things/:serial_no/alert', function (req, res) {
    let access_token = req.header('Authorization').split(' ')[1];
    if (access_token != KEY) {
        res.status(401).send({error: 'invalid access token'});
        console.error('invalid access token');
        return;
    }


    try {
        /*
         a1:エラーコード
         a2:発生した時の外気温度（℃）
         a3:切断ヒータの温度（℃）
         a4:接着右ヒータの温度（℃）
         a5:接着左ヒータの温度（℃）
         a6:切断ヒータへの出力値（％）
         a7:接着右ヒータへの出力値（％）
         a8:接着左ヒータへの出力値（％）
         a9:センサー1の状態(0, 1)
         a10:センサー2の状態(0, 1)
         a11:センサー3の状態(0, 1)
         a12:搬送モータの速度(rpm)
         a13:切断ヒータのステップ数
         a14:接着ヒータのステップ数
         */
        let serial_no, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14;
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
                a14__c: a14
            }, function (err, ret) {
                if (err || !ret.success) {
                    return console.error(err, ret);
                }
                console.log('Updated Successfully : ' + ret.id);
            });
        });

    } catch (err) {
        console.error(err);
        res.status(400).send({error: err});
        return;
    }


})


app.listen(process.env.PORT);