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

exports.classes = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var sql = `SELECT * FROM classes WHERE id IS NOT NULL`
    if (req.query.id != undefined) {
        sql = sql + ` AND id =` + req.query.id
    }
    if (req.query.page != undefined && req.query.limit != undefined) {
        var page = req.query.page, limit = req.query.limit
        var offset = (page - 1) * limit;
        sql = sql + ` LIMIT ` + offset + `, ` + limit
    }
    connection.query(sql, function (error, result, fields) {
        if (error) {
            messages = "Internal server error";
            elapseTime = perf.stop();
            elapseTime = elapseTime.time.toFixed(2);
            response.errorRes(500, elapseTime, messages, res);
        } else {
            result.forEach(element => {
                element.created_at = dateFormat(element.created_at, "dd mmmm yyyy HH:MM:ss");
                if (element.updated_at != "0000-00-00 00:00:00") element.updated_at = dateFormat(element.updated_at, "dd mmmm yyyy HH:MM:ss");
                total = total + 1;
            })
            messages = "Success";
            elapseTime = perf.stop();
            elapseTime = elapseTime.time.toFixed(2);
            response.successGet(elapseTime, messages, total, result, res);
        }
    });
};

exports.section = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var class_id = req.query.kelas_id
    var sql = `SELECT * 
    FROM sections WHERE id IS NOT NULL`

    if (req.query.id != undefined) {
        sql = sql + ` AND id =` + req.query.id
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
                response.errorRes(500, elapseTime, messages, res);
            } else {
                result.forEach(element => {
                    element.created_at = dateFormat(element.created_at, "dd mmmm yyyy HH:MM:ss");
                    if (element.updated_at != "0000-00-00 00:00:00") element.updated_at = dateFormat(element.updated_at, "dd mmmm yyyy HH:MM:ss");
                    total = total + 1;
                })
                messages = "Success";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.successGet(elapseTime, messages, total, result, res);
            }
        });

};


exports.class_section = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var class_id = req.query.kelas_id
    var sql = `SELECT a.* ,b.class as class, c.section as section
    FROM class_sections AS a
    JOIN classes AS b ON a.class_id=b.id
    JOIN sections AS c ON a.section_id =c.id
     WHERE a.id IS NOT NULL`

    if (req.query.class_id != undefined) {
        sql = sql + ` AND a.class_id =` + req.query.class_id
    }
    if (req.query.section_id != undefined) {
        sql = sql + ` AND a.section_id =` + req.query.section_id
    }
    if (req.query.id != undefined) {
        sql = sql + ` AND a.id =` + req.query.id
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
                response.errorRes(500, elapseTime, messages, res);
            } else {
                result.forEach(element => {
                    element.created_at = dateFormat(element.created_at, "dd mmmm yyyy HH:MM:ss");
                    if (element.updated_at != "0000-00-00 00:00:00") element.updated_at = dateFormat(element.updated_at, "dd mmmm yyyy HH:MM:ss");
                    total = total + 1;
                })
                messages = "Success";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.successGet(elapseTime, messages, total, result, res);
            }
        });

};


exports.get_sub_kelas = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var id = req.params.id;
    // //console.log(class_id);
    connection.query('SELECT a.id AS id, b.id AS class_id,b.section AS section, b.created_at AS created_at, a.updated_at AS updated_at FROM class_sections AS a JOIN sections AS b on a.section_id = b.id WHERE a.id=?',
        [id], function (error, result, fields) {
            if (error) {
                messages = "Internal server error";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.errorRes(500, elapseTime, messages, res);
            } else {
                result.forEach(element => {
                    element.created_at = dateFormat(element.created_at, "dd mmmm yyyy HH:MM:ss");
                    if (element.updated_at != "0000-00-00 00:00:00") element.updated_at = dateFormat(element.updated_at, "dd mmmm yyyy HH:MM:ss");
                    total = total + 1;
                })
                messages = "Success";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.successGet(elapseTime, messages, total, result, res);
            }
        });
};


exports.subject = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var sql = `SELECT * FROM subjects WHERE id IS NOT NULL`
    if (req.query.id != undefined) {
        sql = sql + ` AND id =` + req.query.id
    }
    if (req.query.search != undefined) {
        sql = sql + ` AND (name LIKE '%` + req.query.search + `%' OR code LIKE '%` + req.query.search + `%' OR type LIKE '%` + req.query.search + `%')`
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

exports.teacher_subject = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var sql = `SELECT *     
    FROM teacher_subjects AS a 
    JOIN subjects AS b ON a.subject_id = b.id 
    #JOIN staff AS c ON a.teacher_id= c.id 
    JOIN class_sections AS d ON a.class_section_id = d.id 
    #JOIN classes AS e ON d.class_id= e.id
    #JOIN sections AS f ON d.section_id= f.id 
    WHERE a.id IS NOT NULL`
    if (req.query.class_section_id != undefined) {
        sql = sql + ' AND a.class_section_id=' + req.query.class_section_id
    }
    if (req.query.subject_id != undefined) {
        sql = sql + ' AND a.subject_id=' + req.query.subject_id
    }
    if (req.query.teacher_id != undefined) {
        sql = sql + ' AND a.teacher_id=' + req.query.teacher_id
    }
    connection.query(sql,
        function (error, result, fields) {
            if (error) {
                messages = "Internal server error";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.errorRes(500, elapseTime, messages, res);
            } else {
                var dataArray = [];
                var data = {};
                result.forEach(element => {
                    element.created_at = dateFormat(element.created_at, "dd mmmm yyyy HH:MM:ss");
                    if (element.updated_at != "0000-00-00 00:00:00") element.updated_at = dateFormat(element.updated_at, "dd mmmm yyyy HH:MM:ss");
                    total = total + 1;
                    if (data.jadwal == element.name) {
                        data.desc = {
                            "day_name": element.day_name,
                            "start_time": element.start_time,
                            "end_time": element.end_time

                        }
                    } else {
                        data = {
                            "jadwal": element.name,
                            "desc": {
                                "day_name": element.day_name,
                                "start_time": element.start_time,
                                "end_time": element.end_time
                            }
                        };
                    }
                    dataArray.push(data);
                    // //console.log(data);

                })
                //console.log(dataArray);
                messages = "Success";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.successGet(elapseTime, messages, total, result, res);
            }
        });
};

exports.get_jadwal = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var id = req.params.id;
    connection.query('SELECT * FROM timetables WHERE id=?',
        [id], function (error, result, fields) {
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
};

exports.insert_jadwal_kelas = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    req.body.forEach(element => {
        // var query = "UPDATE `timetables` SET `start_time` = '" + element.data.start_time + "' ,`end_time` = '" + element.data.end_time + "' ,`room_no` = '" + element.data.room_no + "' WHERE `id`=" + element.id + ";"
        connection.query("UPDATE `timetables` SET `start_time` = ? , `end_time`=?, `room_no`=? WHERE `id`=?",
            [element.data.start_time, element.data.end_time, element.data.room_no, element.id], function (error, result, fields) {

            });
    })
    messages = "Success";
    elapseTime = perf.stop();
    elapseTime = elapseTime.time.toFixed(2);
    response.successPost(elapseTime, messages, res);

};
exports.update_jadwal_kelas = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    req.body.forEach(element => {
        // var query = "UPDATE `timetables` SET `start_time` = '" + element.data.start_time + "' ,`end_time` = '" + element.data.end_time + "' ,`room_no` = '" + element.data.room_no + "' WHERE `id`=" + element.id + ";"
        connection.query("UPDATE `timetables` SET `start_time` = ? , `end_time`=?, `room_no`=? WHERE `id`=?",
            [element.data.start_time, element.data.end_time, element.data.room_no, element.id], function (error, result, fields) {

            });
    })
    messages = "Success";
    elapseTime = perf.stop();
    elapseTime = elapseTime.time.toFixed(2);
    response.successPost(elapseTime, messages, res);

};