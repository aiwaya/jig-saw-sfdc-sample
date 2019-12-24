/**
 * Created by aiwaya on 西暦19/12/25.
 */

/*
 ユーザ名：20190924@demo.com
 パスワード：abcd1234



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
const username = "20190924@demo.com";
const password = "abcd1234";
var jsforce = require('jsforce');
var conn = new jsforce.Connection({});
conn.login(username, password, function(err, userInfo) {
    if (err) { return console.error(err); }

    var v1 = 1;
    var v2 = "2019-12-23T18:25:43.511Z";
    var v3 = '標準';
    var v4 = '12';
    var v5 = '12';
    var v6 = '12';
    var v7 = '12';
    var v8 = '12';
    var v9 = '12';

    conn.sobject("Equipment__c").upsert({
        serial_no__c : 'VR-10001',
        v1__c : v1,
        v2__c : v2,
        v3__c : v3,
        v4__c : v4,
        v5__c : v5,
        v6__c : v6 ,
        v7__c : v7,
        v8__c : v8,
        v9__c : v9
    }, 'serial_no__c', function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log('Updated Successfully : ' + ret.id);
    });
});


