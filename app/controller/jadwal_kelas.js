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

exports.kelas = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    connection.query('SELECT a.id AS kelas_id, a.* FROM classes AS a', function (error, result, fields) {
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
exports.get_kelas = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var id = req.params.id;
    connection.query('SELECT * FROM classes WHERE id =?', [id], function (error, result, fields) {
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
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var class_id = req.query.kelas_id
    if (class_id != undefined) {
        connection.query('SELECT a.id AS sub_kelas_id, a.class_id AS kelas_id,b.section AS kelas, b.created_at AS created_at, a.updated_at AS updated_at FROM class_sections AS a JOIN sections AS b on a.section_id = b.id WHERE a.class_id=?',
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
    } else {
        // //console.log(class_id);
        connection.query('SELECT a.id AS id, b.id AS class_id,b.section AS section, b.created_at AS created_at, a.updated_at AS updated_at FROM class_sections AS a JOIN sections AS b on a.section_id = b.id',
            function (error, result, fields) {
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
exports.get_sub_kelas = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var id = req.params.id;
    // //console.log(class_id);
    connection.query('SELECT a.id AS id, b.id AS class_id,b.section AS section, b.created_at AS created_at, a.updated_at AS updated_at FROM class_sections AS a JOIN sections AS b on a.section_id = b.id WHERE a.id=?',
        [id], function (error, result, fields) {
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


exports.mata_pelajaran = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    if (req.query.sub_kelas_id == undefined) {
        connection.query('SELECT * FROM subjects',
            function (error, result, fields) {
                if (error) {
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.errorRes(elapseTime, messages, res);
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
    } else {
        connection.query('SELECT a.id as id, a.session_id as session_id,a.subject_id as subject_id,a.teacher_id as teacher_id, b.name as name,b.code as code,b.type as type FROM `teacher_subjects` as a JOIN subjects as b ON a.subject_id = b.id where a.class_section_id =?',
            [req.query.sub_kelas_id], function (error, result, fields) {
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

exports.get_mata_pelajaran = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var id = req.params.id;
    connection.query('SELECT * FROM subjects WHERE id=?',
        [id], function (error, result, fields) {
            if (error) {
                messages = "Internal server error";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.errorRes(elapseTime, messages, res);
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

exports.jadwal = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    if (req.query.mata_pelajaran_id != undefined && req.query.sub_kelas_id != undefined) {
        var sub_kelas_id = req.query.sub_kelas_id;
        var mata_pelajaran_id = req.query.mata_pelajaran_id;
        connection.query('SELECT * FROM `teacher_subjects` AS a JOIN subjects AS b ON a.subject_id = b.id JOIN timetables AS c ON a.id = c.teacher_subject_id WHERE a.class_section_id=? AND a.subject_id =?',
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
                        // //console.log(data);

                    })
                    //console.log(dataArray);
                    messages = "Success";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successGet(elapseTime, messages, total, result, res);
                }
            });
    }
    else if (req.query.sub_kelas_id != undefined) {
        var sub_kelas_id = req.query.sub_kelas_id;
        connection.query('SELECT * FROM `teacher_subjects` AS a JOIN subjects AS b ON a.subject_id = b.id JOIN timetables AS c ON a.id = c.teacher_subject_id WHERE a.class_section_id=?',
            [sub_kelas_id], function (error, result, fields) {
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
                        // //console.log(data);

                    })
                    //console.log(dataArray);
                    messages = "Success";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successGet(elapseTime, messages, total, result, res);
                }
            });
    } else {
        connection.query('SELECT * FROM `teacher_subjects` AS a JOIN subjects AS b ON a.subject_id = b.id JOIN timetables AS c ON a.id = c.teacher_subject_id',
            function (error, result, fields) {
                if (error) {
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.errorRes(elapseTime, messages, res);
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

exports.get_jadwal = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var id = req.params.id;
    connection.query('SELECT * FROM timetables WHERE id=?',
        [id], function (error, result, fields) {
            if (error) {
                messages = "Internal server error";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.errorRes(elapseTime, messages, res);
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

exports.insert_jadwal_kelas = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    req.body.forEach(element => {
        // var query = "UPDATE `timetables` SET `start_time` = '" + element.data.start_time + "' ,`end_time` = '" + element.data.end_time + "' ,`room_no` = '" + element.data.room_no + "' WHERE `id`=" + element.id + ";"
        connection.query("UPDATE `timetables` SET `start_time` = ? , `end_time`=?, `room_no`=? WHERE `id`=?",
            [element.data.start_time, element.data.end_time, element.data.room_no, element.id], function (error, result, fields) {

            });
    })
    messages = "Success";
    elapseTime = perf.stop();
    elapseTime = elapseTime.time.toFixed(2);
    response.successPost(elapseTime, messages, res);

};
exports.update_jadwal_kelas = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    req.body.forEach(element => {
        // var query = "UPDATE `timetables` SET `start_time` = '" + element.data.start_time + "' ,`end_time` = '" + element.data.end_time + "' ,`room_no` = '" + element.data.room_no + "' WHERE `id`=" + element.id + ";"
        connection.query("UPDATE `timetables` SET `start_time` = ? , `end_time`=?, `room_no`=? WHERE `id`=?",
            [element.data.start_time, element.data.end_time, element.data.room_no, element.id], function (error, result, fields) {

            });
    })
    messages = "Success";
    elapseTime = perf.stop();
    elapseTime = elapseTime.time.toFixed(2);
    response.successPost(elapseTime, messages, res);

};