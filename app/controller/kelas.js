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

exports.list_kelas = function (req, res) {
    perf.start();
    var total = 0;
    connection.query("SELECT a.id AS id, a.class_id AS class_id ,a.section_id AS section_id, b.class AS class, c.section AS section FROM `class_sections` AS a JOIN classes AS b ON a.class_id=b.id JOIN sections AS c ON a.section_id=c.id ORDER BY class_id ASC",
        function (error, result, fields) {
            if (error) {
                messages = "Internal server error";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.errorRes(elapseTime, messages, res);
            } else {
                result.forEach(element => {
                    total = total + 1;
                    console.log(element)
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
    var total = 0;
    connection.query("SELECT a.id AS id, a.class_id AS class_id ,a.section_id AS section_id, b.class AS class, c.section AS section FROM `class_sections` AS a JOIN classes AS b ON a.class_id=b.id JOIN sections AS c ON a.section_id=c.id WHERE a.class_id=? ORDER BY class_id ASC",
        [req.params.kelas_id], function (error, result, fields) {
            if (error) {
                messages = "Internal server error";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.errorRes(elapseTime, messages, res);
            } else {
                result.forEach(element => {
                    total = total + 1;
                    console.log(element)
                })
                messages = "Success";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.successGet(elapseTime, messages, total, result, res);
            }
        });
};


exports.insert_kelas = function (req, res) {
    perf.start();
    var total = 0;
    if (req.body['class_id'] == undefined || req.body['class'] == undefined || req.body.data == undefined) {
        messages = "Failed insert data, data must fill";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
    } else {
        connection.query("SELECT count(id) as count FROM classes WHERE class=? AND id!=?", [req.body['class'], req.body['class_id']],
            function (error, result, fields) {
                if (result[0].count > 0) {
                    messages = "Failed insert data, class already exists";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successPost(elapseTime, messages, res);
                } else {
                    req.body.data.forEach(element => {
                        connection.query("DELETE FROM `class_sections` WHERE class_id=? AND section_id=?", [req.body['class_id'], element['section_id']],
                            function (error, result, fields) {
                                connection.query("INSERT INTO`class_sections`(`id`, `class_id`, `section_id`) SELECT MAX(id) + 1,?,? FROM class_sections",
                                    [req.body.class_id, element.section_id],
                                    function (error, result, fields) {
                                        messages = "Success Update data";
                                        console.log(messages)
                                    });


                            });

                    });
                }
            });

        messages = "Success Update data";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
    }
};

exports.update_kelas = function (req, res) {
    perf.start();
    var total = 0;
    if (req.body['class_id'] == undefined || req.body['class'] == undefined || req.body.data == undefined) {
        messages = "Failed insert data, data must fill";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
    } else {
        connection.query("SELECT count(id) as count FROM classes WHERE class=? AND id!=?", [req.body['class'], req.body['class_id']],
            function (error, result, fields) {
                if (result[0].count > 0) {
                    messages = "Failed insert data, class already exists";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successPost(elapseTime, messages, res);
                } else {
                    req.body.data.forEach(element => {
                        connection.query("DELETE FROM `class_sections` WHERE class_id=? AND section_id=?", [req.body['class_id'], element['section_id']],
                            function (error, result, fields) {
                                connection.query("INSERT INTO`class_sections`(`id`, `class_id`, `section_id`) SELECT MAX(id) + 1,?,? FROM class_sections",
                                    [req.body.class_id, element.section_id],
                                    function (error, result, fields) {
                                        messages = "Success Update data";
                                        console.log(messages)
                                    });


                            });

                    });
                }
            });

        messages = "Success Update data";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
    }
};

