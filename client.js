function get_token(thing_id, token) {
    var buff = Buffer.from(thing_id + ':' + token);
    var client_secret_base64 = buff.toString('base64');

    var request = require('sync-request');
    var res = request('POST', 'https://iotplatform-heroku.herokuapp.com/token', {
        headers: {
            'Authorization': 'Basic ' + client_secret_base64,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });
    res = JSON.parse(res.getBody('utf8'));

    console.log(res);
    return res.access_token;

};


function create_data(access_token, body) {
    var request = require('sync-request');
    var res = request('POST', 'https://iotplatform-heroku.herokuapp.com/things/thing1/data', {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        },
        body: body
    });
    console.log(res.getBody('utf8'));

};

let access_token = get_token('thing_1', 'asa');
let body = '{"timestamp": "2019-12-23T18:25:43.511Z","value": 12.12}';
create_data(access_token, body);