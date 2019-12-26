const username = "20190924@demo.com";
const password = "abcd1234";
var jsforce = require('jsforce');
var conn = new jsforce.Connection({});


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

conn.login(username, password, function(err, userInfo) {
    if (err) { return console.error(err); }

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


    conn.sobject("CustomObject2__c").insert({
        Field1__r : {serial_no__c:'VR-10001'},
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
    }, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log('Updated Successfully : ' + ret.id);
    });
});
