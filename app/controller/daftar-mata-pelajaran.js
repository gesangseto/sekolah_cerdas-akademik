'use strict';

var response = require('../response');
var connection = require('../connection');


const perf = require('execution-time')();
var dateFormat = require('dateformat');
var datetime = require('node-datetime');

let dt = datetime.create();
let error500 = "Internal Server Error";
let error401 = "Unathorized";
let error400 = "Error";
let elapseTime = "";
let messages = "";


async function Query(sql) {
    return new Promise((resolve) =>
        connection.query(sql,
            function (error, rows) {
                if (error) {
                    console.log(error);
                } else {
                    return resolve(rows)
                }
            })
    );
}

exports.getMataPelajaran = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;

    var sql = "SELECT * FROM subjects WHERE id IS NOT NULL"
    if (req.query.is_active != undefined) {
        sql = sql + ` AND is_active='` + req.query.is_active + `'`
    } else {
        sql = sql + ` AND is_active='yes'`
    }
    if (req.query.id != undefined) {
        sql = sql + ` AND id='` + req.query.id + `'`
    }
    if (req.query.search != undefined) {
        sql = sql + ` AND name LIKE '%` + req.query.search + `%' OR code LIKE '%` + req.query.search + `%' OR type LIKE '%` + req.query.search + `%'`
    }
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
                response.error(500, elapseTime, messages, error500, res);
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

exports.insertMataPelajaran = async function (req, res) {
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
        response.error(400, elapseTime, messages, error400, res);
    } else {
        var sql_check_duplicate = "SELECT * FROM subjects WHERE name='" + req.body.name + "' OR code='" + req.body.code + "'"
        var check = await Query(sql_check_duplicate)
        if (check.length > 0) {
            if (check[0].is_active == 'yes') {
                messages = "Failed insert data, name or code already exists";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.error(400, elapseTime, messages, error400, res);
            } else {
                var update_sql = "UPDATE subjects SET is_active='yes' WHERE name='" + req.body.name + "' OR code='" + req.body.code + "'"
                var exec_update = await Query(update_sql)
                if (exec_update) {
                    messages = "Success Insert data";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successPost(elapseTime, messages, res);
                }
            }
        } else {
            connection.query("INSERT INTO `subjects`(`id`,`name`, `code`, `type`) SELECT MAX(id)+1,?,?,? FROM subjects", [req.body.name, req.body.code, req.body.type],
                function (error, result, fields) {
                    messages = "Success Insert Data";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successPost(elapseTime, messages, res);
                });
        }
    }
};


exports.updateMataPelajaran = function (req, res) {
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
                    response.error(400, elapseTime, messages, error400, res);
                } else {
                    connection.query("UPDATE `subjects` SET `name`=?, `code`=?, `type`=?, is_active='yes' WHERE `id`=?", [req.body.name, req.body.code, req.body.type, req.body.id],
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


exports.deleteMataPelajaran = function (req, res) {
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
        connection.query("UPDATE subjects SET is_active='no' WHERE id=?", [id],
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