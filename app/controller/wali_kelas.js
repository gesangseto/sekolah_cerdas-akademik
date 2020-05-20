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

exports.guru_kelas = function (req, res) {
    perf.start();
    var total = 0;
    connection.query("SELECT id, employee_id,department, name, surname,contact_no FROM staff WHERE designation='1'", function (error, result, fields) {
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

exports.get_guru_kelas = function (req, res) {
    var total = 0;
    var id = req.params.id
    console.log(id)
    connection.query("SELECT id, employee_id,department, name, surname,contact_no FROM staff WHERE id =?", [id],
        function (error, result, fields) {
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

exports.wali_kelas = function (req, res) {
    perf.start();
    var total = 0;
    connection.query('SELECT a.* ,b.class AS class,c.section AS section, d.employee_id AS employee_id ,d.name as name, d.surname as surname, d.contact_no as contact_no,d.email as email FROM `class_teacher` AS a JOIN `classes` AS b ON a.class_id = b.id JOIN `sections` AS c ON a.section_id = c.id JOIN `staff` AS d ON a.staff_id = d.id ORDER BY a.class_id ASC',
        function (error, result, fields) {
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
};


exports.get_wali_kelas = function (req, res) {
    perf.start();
    var total = 0;
    var id = req.params.id;
    console.log(id)
    connection.query('SELECT a.* ,b.class AS class,c.section AS section, d.employee_id AS employee_id ,d.name as name, d.surname as surname, d.contact_no as contact_no,d.email as email FROM `class_teacher` AS a JOIN `classes` AS b ON a.class_id = b.id JOIN `sections` AS c ON a.section_id = c.id JOIN `staff` AS d ON a.staff_id = d.id WHERE a.id =?',
        [id], function (error, result, fields) {
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
};
exports.insert_wali_kelas = function (req, res) {
    perf.start();
    var total = 0;
    if (req.body.class_id == undefined || req.body.staff_id == undefined || req.body.section_id == undefined) {
        messages = "Failed to post data, please fill all the requirment!";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
    } else {
        connection.query("SELECT a.* ,b.class AS class,c.section AS section, d.employee_id AS employee_id ,d.name as name, d.surname as surname, d.contact_no as contact_no,d.email as email FROM `class_teacher` AS a JOIN `classes` AS b ON a.class_id = b.id JOIN `sections` AS c ON a.section_id = c.id JOIN `staff` AS d ON a.staff_id = d.id WHERE a.class_id=? AND a.staff_id=? AND a.section_id=?;",
            [req.body.class_id, req.body.staff_id, req.body.section_id], function (error, result, fields) {

                console.log(result.length)
                if (error) {
                    status_code = "500"
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    time = elapseTime.time.toFixed(2);
                    response.error(status_code, time, messages, error, res);
                } else if (result.length > 0) {
                    messages = "Record already exists";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    total = result.length;
                    response.successGet(elapseTime, messages, total, result, res);
                } else {
                    connection.query("INSERT INTO class_teacher (class_id, staff_id, section_id)VALUES (?, ?, ?);",
                        [req.body.class_id, req.body.staff_id, req.body.section_id], function (error, result, fields) {
                            if (error) {
                                status_code = "500"
                                messages = "Internal server error";
                                elapseTime = perf.stop();
                                time = elapseTime.time.toFixed(2);
                                response.error(status_code, time, messages, error, res);
                            } else {
                                messages = "Success Insert Data";
                                elapseTime = perf.stop();
                                elapseTime = elapseTime.time.toFixed(2);
                                response.successPost(elapseTime, messages, res);
                            }
                        });
                }
            });
    }

};
exports.update_wali_kelas = function (req, res) {
    perf.start();
    var total = 0;
    if (req.body.class_id == undefined || req.body.staff_id == undefined || req.body.section_id == undefined || req.body.id == undefined || req.body.id == undefined) {
        messages = "Failed to post data, please fill all the requirment!";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
    }
    else {
        connection.query("SELECT a.* ,b.class AS class,c.section AS section, d.employee_id AS employee_id ,d.name as name, d.surname as surname, d.contact_no as contact_no,d.email as email FROM `class_teacher` AS a JOIN `classes` AS b ON a.class_id = b.id JOIN `sections` AS c ON a.section_id = c.id JOIN `staff` AS d ON a.staff_id = d.id WHERE a.class_id=? AND a.staff_id=? AND a.section_id=?;",
            [req.body.class_id, req.body.staff_id, req.body.section_id], function (error, result, fields) {

                console.log(result.length)
                if (error) {
                    status_code = "500"
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    time = elapseTime.time.toFixed(2);
                    response.error(status_code, time, messages, error, res);
                } else if (result.length > 1) {
                    messages = "Record already exists";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    total = result.length;
                    response.successGet(elapseTime, messages, total, result, res);
                } else {
                    var id = req.body.id;
                    console.log(id)
                    connection.query("UPDATE `class_teacher` SET `class_id`=?, `staff_id`=?, `section_id`=? WHERE `id`=?",
                        [req.body.class_id, req.body.staff_id, req.body.section_id, req.body.id], function (error, result, fields) {
                            if (error) {
                                status_code = "500"
                                messages = "Internal server error";
                                elapseTime = perf.stop();
                                time = elapseTime.time.toFixed(2);
                                response.error(status_code, time, messages, error, res);
                            } else {
                                messages = "Success Update Data";
                                elapseTime = perf.stop();
                                elapseTime = elapseTime.time.toFixed(2);
                                response.successPost(elapseTime, messages, res);
                            }
                        });
                }
            });
    }

};

exports.delete_wali_kelas = function (req, res) {
    perf.start();
    console.log(req.body)
    connection.query('DELETE FROM class_teacher WHERE id=?',
        [req.body.id], function (error, result, fields) {
            if (error) {
                status_code = "500"
                messages = "Internal server error";
                elapseTime = perf.stop();
                time = elapseTime.time.toFixed(2);
                response.error(status_code, time, messages, error, res);
            } else {
                messages = "SuccessDelete";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.successPost(elapseTime, messages, res);
            }
        });
};