
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



var body =
    {
        v1 : 2,
        v2 : "2019-12-25T18:25:43.511Z",
        v3 : '3',
        v4 : '4',
        v5 : '5',
        v6 : '6',
        v7 : '7',
        v8 : '8',
        v9 : '9'
    };

//create_data(JSON.stringify(body));


var b =
    {
        a1 : '1',
        a2 : 2,
        a3 : 3,
        a4 : 4,
        a5 : 5,
        a6 : 6 ,
        a7 : 7,
        a8 : 8,
        a9 : 1,
        a10 : 0,
        a11 : 1,
        a12 : "2019-12-25T18:25:43.511Z",
        a13 : 13,
        a14 : 14,
        a15 : '15',
        a16 : 16 ,
        a17 : 17,
        a18 : 18,
        a19 : 19,
        a20 : '20',
        a21 : '21',
        a22 : '22',
        a23 : '23',
        a24 : '24'
};

create_alert(JSON.stringify(b));





