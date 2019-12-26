
function create_data(body) {
    console.log(body);
    var res;
    try {
        let request = require('sync-request');
        res = request('POST', 'https://jig-saw-sfdc-sample.herokuapp.com/things/VR-10001/data', {
            headers: {
                'Authorization': 'Bearer jy4BRHPgIn4t4cWOV4c',
                'Content-Type': 'application/json'
            },
            body: body
        });
        if(res.statusCode != '201') {
            console.log('error');
            console.log(res.body.toString());
        }
        console.log(res.statusCode);
    } catch (err) {
        console.log(err);
    }
};


function create_alert(body) {
    var res;
    try {
        let request = require('sync-request');
        res = request('POST', 'https://jig-saw-sfdc-sample.herokuapp.com/things/VR-10001/alert', {
            headers: {
                'Authorization': 'Bearer jy4BRHPgIn4t4cWOV4c',
                'Content-Type': 'application/json'
            },
            body: body
        });
        if(res.statusCode != '201') {
            console.log('error');
            console.log(res.body.toString());
        }
        console.log(res.statusCode);
    } catch (err) {
        console.log(err);
    }
};

var v1 = 1;
var v2 = "2019-12-25T18:25:43.511Z";
var v3 = '3';
var v4 = '4';
var v5 = '5';
var v6 = '6';
var v7 = '7';
var v8 = '8';
var v9 = '9';

var body =
    {
        v1 : v1,
        v2 : v2,
        v3 : v3,
        v4 : v4,
        v5 : v5,
        v6 : v6 ,
        v7 : v7,
        v8 : v8,
        v9 : v9
    };

create_data(JSON.stringify(body));


var a1 = '1';
var a2 = 2;
var a3 = 3;
var a4 = 4;
var a5 = 5;
var a6 = 6;
var a7 = 7;
var a8 = 8;
var a9 = 9;
var a10 = 10;
var a11 = 11;
var a12 = 12;
var a13 = 13;
var a14 = 14;

var b =
    {
        a1 : a1,
        a2 : a2,
        a3 : a3,
        a4 : a4,
        a5 : a5,
        a6 : a6 ,
        a7 : a7,
        a8 : a8,
        a9 : a9,
        a10 : a10,
        a11 : a11,
        a12 : a12,
        a13 : a13,
        a14 : a14
};

create_alert(JSON.stringify(b));





