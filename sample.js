
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






