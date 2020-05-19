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

exports.guru_matapelajaran = function (req, res) {
    perf.start();
    var total = 0;
    if (req.query.sub_kelas_id == undefined) {
        connection.query("SELECT a.id AS id,a.class_section_id as class_section_id,a.session_id as session_id,a.subject_id as subject_id,a.teacher_id as teacher_id,b.name as subject_name,b.code as subject_code,b.type as subject_type,c.name as teacher_name,c.surname as teacher_surname,c.contact_no as teacher_contact_no,c.email as teacher_email FROM `teacher_subjects` AS a JOIN subjects AS b ON a.subject_id = b.id JOIN staff AS c ON a.teacher_id = c.id",
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
    } else if (req.query.sub_kelas_id != undefined) {
        connection.query("SELECT a.id AS id,a.session_id as session_id,a.class_section_id as class_section_id,a.subject_id as subject_id,a.teacher_id as teacher_id,b.name as subject_name,b.code as subject_code,b.type as subject_type,c.name as teacher_name,c.surname as teacher_surname,c.contact_no as teacher_contact_no,c.email as teacher_email FROM `teacher_subjects` AS a JOIN subjects AS b ON a.subject_id = b.id JOIN staff AS c ON a.teacher_id = c.id WHERE class_section_id=?",
            [req.query.sub_kelas_id], function (error, result, fields) {
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

exports.post_guru_matapelajaran = function (req, res) {
    perf.start();
    var total = 0;
    var temp_message = {};
    var messages = [];
    if (req.body.sub_kelas_id != undefined && req.body.data != undefined) {
        req.body.data.forEach(element => {
            // jika elemen id tidak ada berarti ingin menambahkan data baru
            if (element.id == undefined) {
                // mencari data duplicate jika tambah baru
                connection.query("SELECT * FROM teacher_subjects WHERE subject_id=? AND teacher_id=?", [element.subject_id, element.teacher_id],
                    function (error, result, fields) {
                        if (result.lenght > 0) {
                            temp_message = {
                                "subject_id": element.subject_id,
                                "teacher_id": element.teacher_id,
                                "messages": "Failed add data, Data already exists"
                            }
                        } else {
                            connection.query("INSERT INTO teacher_subjects (class_section_id, subject_id, teacher_id)VALUES (?,?, ?, ?);",
                                [req.body.sub_kelas_id, element.subject_id, element.teacher_id], function (error, result, fields) {
                                    temp_message = {
                                        "subject_id": element.subject_id,
                                        "teacher_id": element.teacher_id,
                                        "messages": "Success Input"
                                    }
                                });
                        }
                    });
            }
            else {
                connection.query("SELECT * FROM teacher_subjects WHERE subject_id=? AND teacher_id=?", [element.subject_id, element.teacher_id],
                    function (error, result, fields) {
                        if (result.lenght > 1) {
                            temp_message = {
                                "subject_id": element.subject_id,
                                "teacher_id": element.teacher_id,
                                "messages": "Failed Update, Data already exists"
                            }
                        } else {
                            connection.query("UPDATE `class_teacher` SET `subject_id`=?, `teacher_id`=? WHERE `id`=?;",
                                [element.subject_id, element.teacher_id, element.id], function (error, result, fields) {
                                    temp_message = {
                                        "class_section_id": req.body.sub_kelas_id,
                                        "subject_id": element.subject_id,
                                        "teacher_id": element.teacher_id,
                                        "messages": "Failed Update, Data already exists"
                                    }
                                });
                        }
                    });
            }
            console.log(temp_message);
            messages.push(temp_message);
            total = total + 1;
        });

        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successGet(elapseTime, messages, res);

    }

};


exports.delete_guru_matapelajaran = function (req, res) {
    perf.start();
    var id = req.body.guru_matapelajaran_id
    if (req.body.guru_matapelajaran_id == undefined) {
        messages = "Failed Delete, id cannot null";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
    } else {
        connection.query('DELETE FROM teacher_subjects WHERE id=?', [id],
            function (error, result, fields) {
                if (error) {
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.errorRes(elapseTime, messages, res);
                } else {
                    messages = "SuccessDelete";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successPost(elapseTime, messages, res);
                }
            });

    }
};
