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

exports.list_sub_kelas = function (req, res) {
    perf.start();
    var total = 0;
    connection.query("SELECT * FROM `sections`",
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
    connection.query("SELECT * FROM `sections` WHERE id=?",
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
    var section = req.body.sub_kelas_name
    if (section == undefined) {
        messages = "Failed insert data, data must fill";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
    } else {
        connection.query("SELECT count(id) as count FROM sections WHERE section=?", [section],
            function (error, result, fields) {
                if (result[0].count > 0) {
                    messages = "Failed insert data, class already exists";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successPost(elapseTime, messages, res);
                } else {
                    connection.query("INSERT INTO`sections` (`id`, `section`) SELECT MAX(id) + 1,? FROM sections",
                        [section],
                        function (error, result, fields) {
                            messages = "Success Update data";
                            elapseTime = perf.stop();
                            elapseTime = elapseTime.time.toFixed(2);
                            response.successPost(elapseTime, messages, res);
                        });

                }
            });
    }
};

exports.update_kelas = function (req, res) {
    perf.start();
    var total = 0;
    var section = req.body.sub_kelas_name
    var id = req.body.id
    if (section == undefined || id == undefined) {
        messages = "Failed update data, data must fill";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
    } else {
        connection.query("SELECT count(id) as count FROM sections WHERE section=? AND id!=?",
            [section, id],
            function (error, result, fields) {
                if (result[0].count > 0) {
                    messages = "Failed Update data, Section already exists";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successPost(elapseTime, messages, res);
                } else {
                    connection.query("INSERT INTO `section`(`id`, `class_id`, `section_id`) SELECT MAX(id) + 1,?,? FROM class_sections",
                        [req.body.class_id, element.section_id],
                        function (error, result, fields) {
                            messages = "Success Update data";
                            console.log(messages)
                        });


                }
            });

        messages = "Success Update data";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
    }
};


exports.delete_kelas = function (req, res) {
    perf.start();
    if (req.body.kelas_id == undefined) {
        messages = "Failed Delete, id cannot null";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
    } else {
        var id = req.body.kelas_id
        connection.query('DELETE FROM class_sections WHERE class_id=?', [id],
            function (error, result, fields) {
                if (error) {
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.errorRes(elapseTime, messages, res);
                } else {
                    messages = "Success Delete";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successPost(elapseTime, messages, res);
                }
            });

    }
};