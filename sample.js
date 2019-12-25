
function create_data(body) {
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
        }
        console.log(res.statusCode);
    } catch (err) {
        console.log(err);
    }
};

var v1 = 1;
var v2 = "2019-12-23T18:25:43.511Z";
var v3 = '標準';
var v4 = '9';
var v5 = '121';
var v6 = '121';
var v7 = '121';
var v8 = '121';
var v9 = '121';

var body =
    {
        v1__c : v1,
        v2__c : v2,
        v3__c : v3,
        v4__c : v4,
        v5__c : v5,
        v6__c : v6 ,
        v7__c : v7,
        v8__c : v8,
        v9__c : v9
    };

create_data(JSON.stringify(body));


var a1 = '1';
var a2 = 2;
var a3 = 2;
var a4 = 2;
var a5 = 2;
var a6 = 1;
var a7 = 1;
var a8 = 1;
var a9 = 1;
var a10 = 1;
var a11 = 1;
var a12 = 1;
var a13 = 1;
var a14 = 1;

var b =
    {
        a1__c : a1,
        a2__c : a2,
        a3__c : a3,
        a4__c : a4,
        a5__c : a5,
        a6__c : a6 ,
        a7__c : a7,
        a8__c : a8,
        a9__c : a9,
        a10__c : a10,
        a11__c : a11,
        a12__c : a12,
        a13__c : a13,
        a14__c : a14
};

//create_alert(JSON.stringify(b));





