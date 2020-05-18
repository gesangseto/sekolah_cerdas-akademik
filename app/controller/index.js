'use strict';

var response = require('../response');
var connection = require('../connection');


const perf = require('execution-time')();
var dateFormat = require('dateformat');
var datetime = require('node-datetime');
var dt = datetime.create();
var status_code = "";
var messages = "";
var elapseTime = "";
var time = "";
perf.start();

exports.index = function (req, res) {
    messages = "success";
    elapseTime = perf.stop();
    elapseTime = elapseTime.time.toFixed(2);
    response.successPost(elapseTime, messages, res);
};