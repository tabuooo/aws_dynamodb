'use strict';

const AWS = require('aws-sdk');
const moment = require('moment');

// 環境変数から接続情報を取得

const accessKey = process.env['AWS_ACCESS_KEY'];
const secretAccessKey = process.env['AWS_SECRET_ACCESS_KEY'];
const region = process.env['AWS_REGION'];

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: region,
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
});

const time = 10;

for (let index = 0; index < 5; index++) {
    setTimeout(() => {
        const params = {
            TableName: 'logs_test',
            Item: {
                'ID': 'test',
                'time': moment().toISOString(),
            },
        };
        console.log('start' + moment().toISOString());
        dynamoDB.put(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                console.log('stop' + moment().toISOString());
            }
        });
    }, time * index);
}


