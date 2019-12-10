


function create_data(access_token, body) {
    var request = require('sync-request');
    var res = request('POST', 'https://jig-saw-sfdc-sample.herokuapp.com/things/123/data', {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        },
        body: body
    });
    console.log(res.statusCode);
    console.log(res.getBody('utf8'));

};

let access_token = 'abcd';
let body = '{"timestamp":"2019-12-23T18:25:43.511Z","temperature":"12.12","voltage":"10.1","current":20.1}';
create_data(access_token, body);