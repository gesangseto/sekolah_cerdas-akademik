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

exports.kelas = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;

    var sql = "SELECT a.id AS id, a.class_id AS class_id ,a.section_id AS section_id, b.class AS class, c.section AS section FROM `class_sections` AS a JOIN classes AS b ON a.class_id=b.id JOIN sections AS c ON a.section_id=c.id "
    if (req.query.page != undefined && req.query.limit != undefined) {
        var page = req.query.page, limit = req.query.limit
        var offset = (page - 1) * limit;
        sql = sql + ` LIMIT ` + offset + `, ` + limit
    }
    sql = sql + ` ORDER BY class_id ASC`
    // console.log(sql)
    connection.query(sql,
        function (error, result, fields) {
            if (error) {
                messages = "Internal server error";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.errorRes(500, elapseTime, messages, res);
            } else {
                result.forEach(element => {
                    total = total + 1;
                    //console.log(element)
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
    connection.query("SELECT a.id AS id, a.class_id AS class_id ,a.section_id AS section_id, b.class AS class, c.section AS section FROM `class_sections` AS a JOIN classes AS b ON a.class_id=b.id JOIN sections AS c ON a.section_id=c.id WHERE a.class_id=? ORDER BY class_id ASC",
        [req.params.kelas_id], function (error, result, fields) {
            if (error) {
                messages = "Internal server error";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.errorRes(500, elapseTime, messages, res);
            } else {
                result.forEach(element => {
                    total = total + 1;
                    //console.log(element)
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
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

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
                    response.errorRes(400, elapseTime, messages, res);
                } else {
                    req.body.data.forEach(element => {
                        connection.query("DELETE FROM `class_sections` WHERE class_id=? AND section_id=?", [req.body['class_id'], element['section_id']],
                            function (error, result, fields) {
                                connection.query("INSERT INTO`class_sections`(`id`, `class_id`, `section_id`) SELECT MAX(id) + 1,?,? FROM class_sections",
                                    [req.body.class_id, element.section_id],
                                    function (error, result, fields) {
                                        messages = "Success Update data";
                                        //console.log(messages)
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
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    if (req.body['class_id'] == undefined || req.body['class'] == undefined || req.body.data == undefined) {
        messages = "Failed insert data, data must fill";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.errorRes(400, elapseTime, messages, res);
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
                                        //console.log(messages)
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


exports.delete_kelas = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

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
                    response.errorRes(500, elapseTime, messages, res);
                } else {
                    messages = "Success Delete";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successPost(elapseTime, messages, res);
                }
            });

    }
};