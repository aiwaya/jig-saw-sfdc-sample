


function create_data(access_token, body) {

        var request = require('sync-request');
     var res = request('POST', 'https://jig-saw-sfdc-sample.herokuapp.com/things/123/data', {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        },
        body: body
    });


        console.log('code:' + res.statusCode);
    try {
        res.getBody('utf8');
    } catch(err) {
        console.log(err.body.toString());
    }


};

let access_token = 'abcd';
let body = '{"timestamp":"2019-12-23T18:25:43.511Zs","temperature":"12.12","voltage":"10.1","current":20.1}';
try {
    create_data(access_token, body);
} catch(err) {
    console.log('----------------');
    console.log(err);
}