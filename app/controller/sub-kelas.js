'use strict';
const response = require('../response');
const connection = require('../connection');

const perf = require('execution-time')();
const dateFormat = require('dateformat');
const datetime = require('node-datetime');
const moment = require('moment');

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

exports.getSection = function (req, res) {
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



exports.insertSection = async function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var section = req.body.section
    if (section == undefined) {
        messages = "Failed insert data, section must fill";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.error(400, elapseTime, messages, error400, res);
    } else {
        var sql_check_duplicate = "SELECT * FROM sections WHERE section ='" + section + "' LIMIT 1"
        var check = await Query(sql_check_duplicate)
        if (check.length > 0) {
            if (check[0].is_active == 'yes') {
                messages = "Failed insert data, section already exists";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.error(400, elapseTime, messages, error400, res);
            } else {
                var update_sql = "UPDATE sections SET is_active='yes' WHERE section ='" + section + "'"
                var exec_update = await Query(update_sql)
                if (exec_update) {
                    messages = "Success Insert data";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successPost(elapseTime, messages, res);
                }
            }
        } else {
            var insert_sql = "INSERT INTO `sections`(`id`, `section`,`is_active`) SELECT MAX(id) + 1,'" + section + "','yes' FROM sections"
            var execution_insert = await Query(insert_sql)
            if (execution_insert) {
                messages = "Success Insert data";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.successPost(elapseTime, messages, res);
            } else {
                messages = "error";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.error(500, elapseTime, messages, error500, res);
            }
        }
    }
};


exports.updateSection = async function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var section = req.body.section
    var id = req.body.id
    if (section == undefined || id == undefined) {
        messages = "Failed update data, data must fill";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.error(400, elapseTime, messages, error400, res);
    } else {
        var sql_check_duplicate = "SELECT COUNT(*) as count FROM sections WHERE id!= " + id + " AND section ='" + section + "'"
        var check = await Query(sql_check_duplicate)
        if (check[0].count) {
            messages = "Failed insert data, section already exists";
            elapseTime = perf.stop();
            elapseTime = elapseTime.time.toFixed(2);
            response.error(400, elapseTime, messages, error400, res);
        } else {
            var update_sql = "UPDATE `sections` SET `section`='" + section + "' WHERE `id`=" + id
            var execution_insert = await Query(update_sql)
            if (execution_insert) {
                messages = "Success Update data";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.successPost(elapseTime, messages, res);
            } else {
                messages = "Internal Error";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.errorRes(500, elapseTime, messages, error500, res);
            }
        }
    }
};


exports.deleteSection = async function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var id = req.body.id
    if (id == undefined) {
        messages = "Failed Delete, id cannot null";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.errorRes(400, elapseTime, messages, res);
    } else {
        // var get_relation = await CheckRelation("sections_id", id)
        // console.log(get_relation)
        var sql_delete = "UPDATE sections SET `is_active`='no' WHERE id=" + id
        var execute_sql = await Query(sql_delete)
        if (execute_sql) {
            messages = "Success Delete";
            elapseTime = perf.stop();
            elapseTime = elapseTime.time.toFixed(2);
            response.successPost(elapseTime, messages, res);
        }
    }
};


// async function CheckRelation(column_name, id) {
//     var check_relation_table = "SELECT TABLE_NAME, COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME LIKE '" + column_name + "'"
//     var get_relation = await Query(check_relation_table)
//     var DataArray = {};
//     var Data = [];
//     var count = 0
//     DataArray['column_name'] = column_name;
//     DataArray['id'] = id;
//     DataArray.data_relation = {}
//     if (get_relation) {
//         for (const data of get_relation) {
//             var sql = "SELECT COUNT(*) as count FROM " + data.TABLE_NAME + " WHERE " + data.COLUMN_NAME + " = " + id
//             var execute_sql = await Query(sql)
//             if (execute_sql[0].count > 0) {
//                 DataArray.data_relation[data.TABLE_NAME] = execute_sql[0].count
//                 count = +count + execute_sql[0].count
//                 DataArray.found = count;
//             }
//         }
//     }
//     // console.log(DataArray)
//     return DataArray
// }
