'use strict';

var response = require('../response');
var connection = require('../connection');


const perf = require('execution-time')();
var dateFormat = require('dateformat');
var datetime = require('node-datetime');

let date_ob = new Date();

var dt = datetime.create();
var status_code = "";
var messages = "";
var elapseTime = "";

exports.guru_mata_pelajaran = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    if (req.query.sub_kelas_id == undefined) {
        connection.query("SELECT a.id AS teacher_subject_id,a.class_section_id as sub_kelas_id,a.session_id as session_id,a.subject_id as mata_pelajaran_id,a.teacher_id as guru_id,b.name as nama_mata_pelajaran,b.code as code_mata_pelajaran,b.type as type_mata_pelajaran,c.name as nama_guru,c.surname as surname_guru,c.contact_no as contact_no_guru,c.email as email_guru FROM `teacher_subjects` AS a JOIN subjects AS b ON a.subject_id = b.id JOIN staff AS c ON a.teacher_id = c.id",
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
        connection.query("SELECT a.id AS teacher_subject_id,a.class_section_id as sub_kelas_id,a.session_id as session_id,a.subject_id as mata_pelajaran_id,a.teacher_id as guru_id,b.name as nama_mata_pelajaran,b.code as code_mata_pelajaran,b.type as type_mata_pelajaran,c.name as nama_guru,c.surname as surname_guru,c.contact_no as contact_no_guru,c.email as email_guru FROM `teacher_subjects` AS a JOIN subjects AS b ON a.subject_id = b.id JOIN staff AS c ON a.teacher_id = c.id WHERE class_section_id=?",
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

exports.post_guru_mata_pelajaran = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var temp_message = {};
    var messages = [];
    if (req.body.sub_kelas_id != undefined && req.body.data != undefined) {
        var class_section_id = req.body.sub_kelas_id
        var data = req.body.data
        data.forEach(element => {
            // jika elemen id tidak ada berarti ingin menambahkan data baru

            // get current session di sch_setting
            connection.query("SELECT * FROM `sch_settings`;",
                function (error, result, fields) {
                    var session_id = result[0].session_id;

                    if (element.id != undefined) {
                        connection.query("SELECT count(*) as count FROM teacher_subjects WHERE session_id=? AND class_section_id=? AND subject_id=?",
                            [session_id, class_section_id, element.mata_pelajaran_id],
                            function (error, result, fields) {
                                if (result[0].count > 1) {
                                    temp_message = {
                                        "subject_id": element.mata_pelajaran_id,
                                        "teacher_id": element.teacher_id,
                                        "messages": "Failed Update, Data already exists"
                                    }
                                    //console.log(temp_message);
                                } else {
                                    connection.query("UPDATE `teacher_subjects` SET `subject_id`=?, `teacher_id`=? WHERE `id`=?;",
                                        [element.mata_pelajaran_id, element.guru_id, element.id], function (error, result, fields) {
                                            temp_message = {
                                                "class_section_id": class_section_id,
                                                "subject_id": element.mata_pelajaran_id,
                                                "teacher_id": element.guru_id,
                                                "messages": "Success Update"
                                            }
                                            //console.log(temp_message);
                                        });
                                }
                            });
                    } else {
                        // mencari data duplicate jika tambah baru
                        connection.query("SELECT count(*) as count FROM teacher_subjects WHERE session_id=? AND class_section_id=? AND subject_id=? ",
                            [session_id, class_section_id, element.mata_pelajaran_id],
                            function (error, result, fields) {
                                if (result[0].count > 0) {
                                    temp_message = {
                                        "subject_id": element.mata_pelajaran_id,
                                        "teacher_id": element.guru_id,
                                        "messages": "Failed input data, Data already exists"
                                    }
                                    //console.log(temp_message);
                                } else {
                                    connection.query("INSERT INTO teacher_subjects (id,session_id, class_section_id, subject_id, teacher_id) SELECT MAX(id)+1,?,?,?,? FROM teacher_subjects;",
                                        [session_id, class_section_id, element.mata_pelajaran_id, element.guru_id], function (error, result, fields) {
                                            temp_message = {
                                                "subject_id": element.mata_pelajaran_id,
                                                "teacher_id": element.guru_id,
                                                "messages": "Success Input"
                                            }
                                            //console.log(temp_message);
                                        });
                                }
                            });
                    }
                });

        });
        messages = "Success Update";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
    }
};


exports.delete_guru_mata_pelajaran = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var id = req.body.guru_mata_pelajaran_id
    if (req.body.guru_mata_pelajaran_id == undefined) {
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
