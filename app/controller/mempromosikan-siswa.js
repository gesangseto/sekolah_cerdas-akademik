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

async function GetCurrentSession() {
    return new Promise((resolve) =>
        connection.query('SELECT * FROM sch_settings',
            function (error, rows) {
                if (error) {
                    console.log(error);
                } else {
                    return resolve(rows)
                }
            })
    );
}



exports.getKelas = async function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)
    var total = 0;
    var sql = `SELECT * FROM classes
    WHERE id IS NOT NULL`
    if (req.query.is_active != undefined) {
        sql = sql + ` AND is_active='` + req.query.is_active + `'`
    } else {
        sql = sql + ` AND is_active='yes'`
    }
    if (req.query.id != undefined) {
        sql = sql + ` AND id='` + req.query.id + `'`
    }
    if (req.query.search != undefined) {
        sql = sql + ` AND (class LIKE '%` + req.query.search + `%' OR id LIKE '%` + req.query.search + `%')`
    }
    if (req.query.page != undefined && req.query.limit != undefined) {
        var page = req.query.page, limit = req.query.limit
        var offset = (page - 1) * limit;
        sql = sql + ` LIMIT ` + offset + `, ` + limit
    }
    sql = sql + ` ORDER BY id ASC`
    var get_kelas = await Query(sql)

    if (get_kelas.length > 0) {
        get_kelas.forEach(element => {
            total = total + 1
        })
    }
    let message = "success";
    return response.successGet(elapseTime, message, total, get_kelas, res)
};


exports.getSubKelas = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var sql = "SELECT * FROM `sections` WHERE id IS NOT NULL"
    if (req.query.is_active != undefined) {
        sql = sql + ` AND is_active='` + req.query.is_active + `'`
    } else {
        sql = sql + ` AND is_active='yes'`
    }
    if (req.query.id != undefined) {
        sql = sql + ` AND id=` + req.query.id
    }
    if (req.query.search != undefined) {
        sql = sql + ` AND section LIKE '%` + req.query.search + `%' OR id LIKE '%` + req.query.search + `%' `
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
                response.error(500, elapseTime, error, error500, res);
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


exports.getMempromosikanSiswa = async function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var SessionId = await GetCurrentSession()
    SessionId = SessionId[0].session_id

    var total = 0;

    var sql = `SELECT a.*, b.admission_no,b.firstname,b.lastname,b.father_name,b.dob,c.class ,d.section
    FROM student_session as a
    JOIN students as b on a.student_id = b.id
    JOIN classes as c on c.id = a.class_id
    JOIN sections as d on d.id=a.section_id
    WHERE a.session_id ='` + SessionId + `'`
    if (req.query.is_active != undefined) {
        sql = sql + ` AND a.is_active='` + req.query.is_active + `'`
    } else {
        sql = sql + ` AND a.is_active='yes'`
    }
    if (req.query.id != undefined) {
        sql = sql + ` AND a.id='` + req.query.id + `'`
    }
    if (req.query.class_id != undefined) {
        sql = sql + ` AND a.class_id='` + req.query.class_id + `'`
    }
    if (req.query.section_id != undefined) {
        sql = sql + ` AND a.section_id='` + req.query.section_id + `'`
    }
    if (req.query.search != undefined) {
        sql = sql + ` AND b.firstname LIKE '%` + req.query.search + `%' OR b.lastname LIKE '%` + req.query.search + `%' OR b.father_name LIKE '%` + req.query.search + `%'`
    }
    if (req.query.page != undefined && req.query.limit != undefined) {
        var page = req.query.page, limit = req.query.limit
        var offset = (page - 1) * limit;
        sql = sql + ` LIMIT ` + offset + `, ` + limit
    }
    console.log(sql)

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

exports.insertMempromosikanSiswa = async function (req, res) {
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