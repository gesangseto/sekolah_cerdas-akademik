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

exports.list_mata_pelajaran = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;

    var sql = "SELECT * FROM subjects"
    if (req.query.page != undefined && req.query.limit != undefined) {
        var page = req.query.page, limit = req.query.limit
        var offset = (page - 1) * limit;
        sql = sql + ` LIMIT ` + offset + `, ` + limit
    }

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
                })
                messages = "Success";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.successGet(elapseTime, messages, total, result, res);
            }
        });
};
exports.get_mata_pelajaran = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    if (req.params.id == undefined) {
        messages = "Failed get data, id cannot null";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.errorRes(401, elapseTime, messages, total, result, res);
    } else {
        connection.query("SELECT * FROM subjects WHERE id=?", [req.params.id],
            function (error, result, fields) {
                if (error) {
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.errorRes(500, elapseTime, messages, res);
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

exports.insert_mata_pelajaran = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    if (req.body.name == undefined || req.body.type == undefined || req.body.code == undefined) {
        messages = "Failed insert data, data must fill";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.errorRes(401, elapseTime, messages, res);
    } else {
        connection.query("SELECT count(id) as count FROM subjects WHERE name=? OR code=?", [req.body.name, req.body.code],
            function (error, result, fields) {
                if (result[0].count > 0) {
                    messages = "Failed insert data, data duplicate";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successPost(401, elapseTime, messages, res);
                } else {
                    connection.query("INSERT INTO `subjects`(`id`,`name`, `code`, `type`) SELECT MAX(id)+1,?,?,? FROM subjects", [req.body.name, req.body.code, req.body.type],
                        function (error, result, fields) {
                            messages = "Success Insert Data";
                            elapseTime = perf.stop();
                            elapseTime = elapseTime.time.toFixed(2);
                            response.successPost(elapseTime, messages, res);
                        });
                }
            });
    }
};


exports.update_mata_pelajaran = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    if (req.body.id == undefined || req.body.name == undefined || req.body.type == undefined || req.body.code == undefined) {
        messages = "Failed update data, data must fill";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.errorRes(401, elapseTime, messages, res);
    } else {
        connection.query("SELECT count(id) as count FROM subjects WHERE name=? OR code=?", [req.body.name, req.body.code],
            function (error, result, fields) {
                if (result[0].count > 1) {
                    messages = "Failed update data, data duplicate";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.errorRes(401, elapseTime, messages, res);
                } else {
                    connection.query("UPDATE `subjects` SET `name`=?, `code`=?, `type`=? WHERE `id`=?", [req.body.name, req.body.code, req.body.type, req.body.id],
                        function (error, result, fields) {
                            messages = "Success Update Data";
                            elapseTime = perf.stop();
                            elapseTime = elapseTime.time.toFixed(2);
                            response.successPost(elapseTime, messages, res);
                        });
                }
            });
    }
};


exports.delete_mata_pelajaran = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    if (req.body.id == undefined) {
        messages = "Failed Delete, id cannot null";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.errorRes(401, elapseTime, messages, res);
    } else {
        var id = req.body.id
        connection.query('DELETE FROM subjects WHERE id=?', [id],
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