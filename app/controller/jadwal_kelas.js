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
        console.log(class_id);
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

exports.mata_pelajaran = function (req, res) {
    perf.start();
    var total = 0;
    if (req.body.sub_kelas_id == undefined) {
        messages = "kelas_id or sub_kelas_id cannot empty";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.errorRes(elapseTime, messages, res);
    } else {
        var sub_kelas_id = req.body.sub_kelas_id;
        connection.query('SELECT a.id AS id, b.name AS name FROM `teacher_subjects` AS a JOIN subjects AS b ON a.subject_id = b.id JOIN timetables AS c ON a.id = c.teacher_subject_id WHERE a.class_section_id=? GROUP BY b.name',
            [sub_kelas_id], function (error, result, fields) {
                if (error) {
                    status_code = "500"
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    time = elapseTime.time.toFixed(2);
                    response.error(status_code, time, messages, error, res);
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
    }
};

exports.jadwal_kelas = function (req, res) {
    perf.start();
    var total = 0;
    if (req.body.sub_kelas_id == undefined) {
        messages = "kelas_id or sub_kelas_id cannot empty";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.errorRes(elapseTime, messages, res);
    } if (req.body.mata_pelajaran_id != undefined) {
        var sub_kelas_id = req.body.sub_kelas_id;
        var mata_pelajaran_id = req.body.mata_pelajaran_id; connection.query('SELECT * FROM `teacher_subjects` AS a JOIN subjects AS b ON a.subject_id = b.id JOIN timetables AS c ON a.id = c.teacher_subject_id WHERE a.class_section_id=? AND a.subject_id =?',
            [sub_kelas_id, mata_pelajaran_id], function (error, result, fields) {
                if (error) {
                    status_code = "500"
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    time = elapseTime.time.toFixed(2);
                    response.error(status_code, time, messages, error, res);
                } else {
                    var dataArray = [];
                    var data = {};
                    result.forEach(element => {
                        element.created_at = dateFormat(element.created_at, "dd mmmm yyyy HH:MM:ss");
                        if (element.updated_at != "0000-00-00 00:00:00") element.updated_at = dateFormat(element.updated_at, "dd mmmm yyyy HH:MM:ss");
                        total = total + 1;
                        if (data.jadwal == element.name) {
                            data.desc = {
                                "day_name": element.day_name,
                                "start_time": element.start_time,
                                "end_time": element.end_time

                            }
                        } else {
                            data = {
                                "jadwal": element.name,
                                "desc": {
                                    "day_name": element.day_name,
                                    "start_time": element.start_time,
                                    "end_time": element.end_time
                                }
                            };
                        }
                        dataArray.push(data);
                        // console.log(data);

                    })
                    console.log(dataArray);
                    messages = "Success";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successGet(elapseTime, messages, total, result, res);
                }
            });
    }
    else {
        var sub_kelas_id = req.body.sub_kelas_id;
        connection.query('SELECT * FROM `teacher_subjects` AS a JOIN subjects AS b ON a.subject_id = b.id JOIN timetables AS c ON a.id = c.teacher_subject_id WHERE a.class_section_id=?',
            [sub_kelas_id, mata_pelajaran_id], function (error, result, fields) {
                if (error) {
                    status_code = "500"
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    time = elapseTime.time.toFixed(2);
                    response.error(status_code, time, messages, error, res);
                } else {
                    var dataArray = [];
                    var data = {};
                    result.forEach(element => {
                        element.created_at = dateFormat(element.created_at, "dd mmmm yyyy HH:MM:ss");
                        if (element.updated_at != "0000-00-00 00:00:00") element.updated_at = dateFormat(element.updated_at, "dd mmmm yyyy HH:MM:ss");
                        total = total + 1;
                        if (data.jadwal == element.name) {
                            data.desc = {
                                "day_name": element.day_name,
                                "start_time": element.start_time,
                                "end_time": element.end_time

                            }
                        } else {
                            data = {
                                "jadwal": element.name,
                                "desc": {
                                    "day_name": element.day_name,
                                    "start_time": element.start_time,
                                    "end_time": element.end_time
                                }
                            };
                        }
                        dataArray.push(data);
                        // console.log(data);

                    })
                    console.log(dataArray);
                    messages = "Success";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successGet(elapseTime, messages, total, result, res);
                }
            });
    }


};
