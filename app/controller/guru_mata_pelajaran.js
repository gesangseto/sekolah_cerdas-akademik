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


exports.teacher_subject = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)
    var sql = `SELECT a.id AS teacher_subject_id,a.class_section_id as sub_kelas_id,a.session_id as session_id,a.subject_id as mata_pelajaran_id,a.teacher_id as guru_id,b.name as nama_mata_pelajaran,b.code as code_mata_pelajaran,b.type as type_mata_pelajaran,c.name as nama_guru,c.surname as surname_guru,c.contact_no as contact_no_guru,c.email as email_guru 
    FROM teacher_subjects AS a 
    JOIN subjects AS b ON a.subject_id = b.id 
    JOIN staff AS c ON a.teacher_id = c.id 
    WHERE a.id IS NOT NULL`
    if (req.query.class_section_id != undefined) {
        sql = sql + " AND a.class_section_id=" + req.query.class_section_id
    }
    if (req.query.page != undefined && req.query.limit != undefined) {
        var page = req.query.page, limit = req.query.limit
        var offset = (page - 1) * limit;
        sql = sql + ` LIMIT ` + offset + `, ` + limit
    }
    var total = 0;
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



exports.insert_guru_matapelajaran = async function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    var temp_message = {};
    var messages = [];

    var session_id = await getCurentSession();
    console.log(session_id)
    if (req.body.class_section_id != undefined && req.body.data != undefined) {
        var class_section_id = req.body.class_section_id
        var datas = req.body.data
        for (const data of datas) {
            if (data.id != undefined) {
                var sql = "SELECT count(*) as count FROM teacher_subjects WHERE id!=" + data.id + " AND session_id=" + session_id + " AND class_section_id=" + class_section_id + " AND subject_id=" + data.subject_id;
                var query_to_execute = "UPDATE `teacher_subjects` SET `subject_id`=" + data.subject_id + ", `teacher_id`=" + data.teacher_id + " WHERE `id`=" + data.id
            } else {
                var sql = "SELECT count(*) as count FROM teacher_subjects WHERE session_id=" + session_id + " AND class_section_id=" + class_section_id + " AND subject_id=" + data.subject_id;
                var query_to_execute = "INSERT INTO teacher_subjects (id,session_id, class_section_id, subject_id, teacher_id) SELECT MAX(id)+1," + session_id + "," + class_section_id + "," + data.subject_id + "," + data.teacher_id + " FROM teacher_subjects;"
            }
            const check_duplicate = await Query(sql);
            if (check_duplicate[0].count > 0) {
                console.log("duplicate ya")
            } else {
                await Query(query_to_execute)
            }
        }
        messages = "Success Update";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
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
        response.errorRes(401, elapseTime, messages, res);
    } else {
        connection.query('DELETE FROM teacher_subjects WHERE id=?', [id],
            function (error, result, fields) {
                if (error) {
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.errorRes(500, elapseTime, messages, res);
                } else {
                    messages = "SuccessDelete";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successPost(elapseTime, messages, res);
                }
            });

    }
};



async function getCurentSession() {
    return new Promise((resolve) =>
        connection.query('SELECT * FROM `sch_settings`',
            function (error, rows) {
                if (error) {
                    console.log(error);
                }
                return rows.length > 0 ? resolve(rows[0].session_id) : resolve(false);
            })
    );
}


async function Query(sql) {
    return new Promise((resolve) =>
        connection.query(sql,
            function (error, rows) {
                if (error) {
                    console.log(error);
                }
                return resolve(rows)
            })
    );
}
