'use strict';

exports.error = function (statusCode, time, messages, error, res) {
    var data = {
        'statusCode': statusCode,
        'elapsedTime': time,
        'messages': messages,
        'error': error
    };
    console.log("response : ");
    console.log(data);
    res.json(data);
    res.end();
};

exports.successPost = function (time, messages, res) {
    var data = {
        'statusCode': "200",
        'elapsedTime': time,
        'messages': messages
    };
    console.log("response : ");
    console.log(data);
    res.json(data);
    res.end();
};

exports.successGet = function (time, messages, total, datasets, res) {
    var data = {
        'statusCode': "200",
        'elapsedTime': time,
        'messages': messages,
        'total': total,
        'data': datasets
    };
    console.log("response : ");
    console.log(data);
    res.json(data);
    res.end();
};