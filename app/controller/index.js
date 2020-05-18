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

exports.kelas = function (req, res) {
    perf.start();
    var total = 0;
    connection.query('SELECT * FROM classes', function (error, result, fields) {
        if (error) {
            messages = "Internal server error";
            elapseTime = perf.stop();
            elapseTime = elapseTime.time.toFixed(2);
            response.error(elapseTime, messages, error, res);
        } else {
            result.forEach(element => {
                element.created_at = dateFormat(element.created_at, "dd mmmm yyyy HH:MM:ss");
                if (element.updated_at != "0000-00-00 00:00:00") element.updated_at = dateFormat(element.updated_at, "dd mmmm yyyy HH:MM:ss");
                total = total + 1;
            })
            messages = "Success";
            elapseTime = perf.stop();
            elapseTime = elapseTime.time.toFixed(2);
            response.successGet(elapseTime, messages, total, result, res);
        }
    });
};

exports.sub_kelas = function (req, res) {
    perf.start();
    var total = 0;
    if (req.body.kelas_id == undefined) {
        messages = "kelas_id cannot empty";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.errorRes(elapseTime, messages, res);
    }
    else {
        var class_id = req.body.kelas_id;
        // console.log(class_id);
        connection.query('SELECT a.id AS id, b.section AS section, b.created_at AS created_at, a.updated_at AS updated_at FROM class_sections AS a JOIN sections AS b on a.section_id = b.id WHERE a.class_id=?',
            [class_id], function (error, result, fields) {
                if (error) {
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.error(elapseTime, messages, error, res);
                } else {
                    result.forEach(element => {
                        element.created_at = dateFormat(element.created_at, "dd mmmm yyyy HH:MM:ss");
                        if (element.updated_at != "0000-00-00 00:00:00") element.updated_at = dateFormat(element.updated_at, "dd mmmm yyyy HH:MM:ss");
                        total = total + 1;
                    })
                    messages = "Success";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successGet(elapseTime, messages, total, result, res);
                }
            });
    }
};


exports.guru_kelas = function (req, res) {
    perf.start();
    var total = 0;
    connection.query("SELECT id, employee_id,department, name, surname,contact_no FROM staff WHERE employee_id <>''", function (error, result, fields) {
        if (error) {
            messages = "Internal server error";
            elapseTime = perf.stop();
            elapseTime = elapseTime.time.toFixed(2);
            response.error(elapseTime, messages, error, res);
        } else {
            result.forEach(element => {
                total = total + 1;
            })
            messages = "Success";
            elapseTime = perf.stop();
            elapseTime = elapseTime.time.toFixed(2);
            response.successGet(elapseTime, messages, total, result, res);
        }
    });
};

exports.index = function (req, res) {
    messages = "success";
    elapseTime = perf.stop();
    elapseTime = elapseTime.time.toFixed(2);
    response.successPost(elapseTime, messages, res);
};