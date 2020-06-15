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

exports.getClass = async function (req, res) {
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


exports.getSectionClass = async function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)
    var total = 0;
    var sql = `SELECT a.id AS id, a.class_id AS class_id ,a.section_id AS section_id, b.class AS class, c.section AS section 
    FROM class_sections AS a 
    JOIN classes AS b ON a.class_id=b.id
     JOIN sections AS c ON a.section_id=c.id
     WHERE b.is_active = 'yes' AND c.is_active='yes' `
    if (req.query.is_active != undefined) {
        sql = sql + ` AND a.is_active='` + req.query.is_active + `'`
    } else {
        sql = sql + ` AND a.is_active='yes'`
    }
    if (req.query.class_id != undefined) {
        sql = sql + ` AND a.class_id=` + req.query.class_id
    }
    if (req.query.class_section_id != undefined) {
        sql = sql + ` AND a.id =` + req.query.class_section_id
    }
    if (req.query.class_sections_id != undefined) {
        sql = sql + ` AND a.section_id =` + req.query.class_sections_id
    }
    if (req.query.page != undefined && req.query.limit != undefined) {
        var page = req.query.page, limit = req.query.limit
        var offset = (page - 1) * limit;
        var get_group_kelas = `SELECT a.id as class_id,a.class as class
        FROM classes AS a 
        JOIN class_sections AS b ON a.id=b.class_id
         WHERE a.is_active = 'yes' GROUP BY a.class LIMIT ` + offset + `, ` + limit
    } else {
        var get_group_kelas = `SELECT a.id as class_id,a.class as class
        FROM classes AS a 
        JOIN class_sections AS b ON a.id=b.class_id
         WHERE a.is_active = 'yes' GROUP BY a.class `
    }
    // sql = sql + ` ORDER BY a.class_id ASC`
    var get_kelas = await Query(sql)

    // let get_group_kelas = sql + ` GROUP BY a.class_id`;
    console.log(get_group_kelas)
    var get_group = await new Promise((resolve) =>
        connection.query(get_group_kelas, function (error, rows) {
            if (error) {
                console.log(error);
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                return response.error(500, elapseTime, `${error}`, error500, res)
            }
            if (rows.length > 0) {
                return resolve(rows)
            }
            else {
                return resolve(false);
            }
        })
    );

    let item = {}
    let children = {}
    let all_item = []
    if (get_group.length > 0 && get_kelas.length > 0) {
        get_group.forEach(element_group => {
            item.class_id = element_group.class_id
            item.class = element_group.class
            item.sub_class = []
            get_kelas.forEach(element => {
                if (item.class_id === element.class_id) {
                    children.class_section_id = element.id
                    // children.section_id = element.section_id
                    children.section = element.section
                    item.sub_class.push(children)
                    children = {}
                }
                // console.log(element)
            })
            all_item.push(item)
            item = {}
        })
    }
    // console.log(all_item)
    let message = "success";
    return response.successGet(elapseTime, message, total, all_item, res)
};

exports.insertSectionClass = async function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)
    var total = 0;
    // return
    if (req.body['class'] == undefined || req.body['sub_class'] == undefined) {
        messages = "Failed insert data, data must fill";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.successPost(elapseTime, messages, res);
    } else {
        // Check Duplicate for class
        var check_duplicate_sql = "SELECT * FROM classes WHERE class='" + req.body.class + "' "
        var ex_check_duplicate = await Query(check_duplicate_sql)
        // Jika class Duplicate
        if (ex_check_duplicate.length > 0) {
            if (ex_check_duplicate[0].is_active == 'yes') {
                messages = "Failed insert data, class already exists";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.error(400, elapseTime, messages, error400, res);
            } else {
                var arraySection_id = req.body['sub_class']
                var class_id = ex_check_duplicate[0].id
                var lakukan_update = await UpdateRelation(class_id, arraySection_id)
                if (lakukan_update) {
                    var update_sql = "UPDATE classes SET is_active='yes' WHERE class ='" + req.body.class + "'"
                    var exec_update = await Query(update_sql)
                    if (exec_update) {
                        messages = "Success Insert data";
                        elapseTime = perf.stop();
                        elapseTime = elapseTime.time.toFixed(2);
                        response.successPost(elapseTime, messages, res);
                    }

                }
            }
        }
        // Jika class tidak duplicate
        else {
            // Mendapatkan id untuk di insert
            var get_id_sql = "SELECT MAX(id)+1 as id FROM classes"
            var ex_get_id = await Query(get_id_sql)
            var id = ex_get_id[0].id  //id dari hasil diatas
            // insert classes dengan id diatas
            var insert_sql = "INSERT INTO `classes` (`id`, `class`, `is_active`) VALUES (" + id + ",'" + req.body.class + "','yes')"
            var ex_insert = await Query(insert_sql)
            var DataArray = []

            let item = {}
            let children = {}
            let all_item = []
            // jka berhasil insert class
            if (ex_insert) {
                // Pengulangan untuk insert data section_class / sub_class dari body yang dikirim
                for (const data of req.body.data) {
                    // pengecekan section_id
                    var count_section_id_sql = "SELECT count(*) as count FROM sections WHERE id='" + data.section_id + "'"
                    var count_section_id = await Query(count_section_id_sql)
                    // jika section_id ditemukan
                    if (count_section_id[0].count > 0) {
                        // insert ke class_section menggunakan class_id dan section_id
                        var insert_sql = "INSERT INTO `class_sections` (`class_id`, `section_id`,`is_active`) VALUES (" + id + ",'" + data.section_id + "','yes')"
                        var ex_insert = await Query(insert_sql)
                        if (ex_insert) {
                            item.section_id = data.section_id
                            item.message = "success insert"
                        } else {
                            item.section_id = data.section_id
                            item.message = "Internal server error"
                        }
                        all_item.push(item)
                        item = {}
                    }
                    // jika section_id tidak ditemukan 
                    else {
                        item.section_id = data.section_id
                        item.message = "failed insert, data not found"
                        all_item.push(item)
                        item = {}
                    }
                }
                // Akhir pengulanagan untuk insert data section_class / sub_class dari body yang dikirim
                messages = all_item;
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.successPost(elapseTime, messages, res);
            } else {
                messages = "Internal server error";
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                response.errorRes(500, elapseTime, messages, res);
            }
        }
    }
};

exports.updateSectionClass = async function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    var total = 0;
    if (req.body['class_id'] == undefined || req.body['class'] == undefined || req.body['sub_class'] == undefined) {
        messages = "Failed insert data, data must fill";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.error(400, elapseTime, messages, error400, res);
    } else {
        // check jika class itu duplicate
        var check_duplicate_sql = "SELECT count(*) as count FROM classes WHERE id!=" + req.body.class_id + " AND class='" + req.body.class + "'"
        var ex_check_duplicate = await Query(check_duplicate_sql)
        // Jika class duplicate
        if (ex_check_duplicate[0].count > 0) {
            messages = "Failed update data, class already exists";
            elapseTime = perf.stop();
            elapseTime = elapseTime.time.toFixed(2);
            response.error(400, elapseTime, messages, error400, res);
        }
        //Jika data tidak duplicate 
        else {
            var arraySection_id = req.body['sub_class']
            var class_id = req.body.class_id
            var lakukan_update = await UpdateRelation(class_id, arraySection_id)
            if (lakukan_update) {
                messages = "success"
                elapseTime = perf.stop();
                elapseTime = elapseTime.time.toFixed(2);
                return response.successGet(elapseTime, messages, total, lakukan_update, res)

            }
        }
    }
}


exports.deleteClass = async function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    if (req.body.class_id == undefined && req.body.id == undefined) {
        messages = "Failed Delete, id cannot null";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.error(400, elapseTime, messages, error400, res);
    } else {
        if (req.body.class_id != undefined) {
            var id = req.body.class_id
        } else if (req.body.id != undefined) {
            var id = req.body.id
        }
        var sql = "UPDATE class_sections SET `is_active`='no' WHERE class_id=" + id
        var delete_relation = await Query(sql)
        if (delete_relation) {
            connection.query("UPDATE classes SET `is_active`='no' WHERE id=?", [id],
                function (error, result, fields) {
                    if (error) {
                        messages = "Internal server error";
                        elapseTime = perf.stop();
                        elapseTime = elapseTime.time.toFixed(2);
                        response.errorRes(500, elapseTime, messages, error500, res);
                    } else {
                        messages = "Success Delete";
                        elapseTime = perf.stop();
                        elapseTime = elapseTime.time.toFixed(2);
                        response.successPost(elapseTime, messages, res);
                    }
                });
        } else {
            messages = "Internal server error";
            elapseTime = perf.stop();
            elapseTime = elapseTime.time.toFixed(2);
            response.errorRes(500, elapseTime, messages, error500, res);
        }


    }
};

exports.deleteSectionClass = function (req, res) {
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + req.originalUrl)
    console.log("body-sent : ")
    console.log(req.body)

    if (req.body.class_section_id == undefined && req.body.id == undefined) {
        messages = "Failed Delete, id cannot null";
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        response.error(400, elapseTime, messages, error400, res);
    } else {
        if (req.body.class_section_id != undefined) {
            var id = req.body.class_section_id
        } else if (req.body.id != undefined) {
            var id = req.body.id
        }
        connection.query("UPDATE class_sections SET `is_active`='no' WHERE id=?", [id],
            function (error, result, fields) {
                if (error) {
                    messages = "Internal server error";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.errorRes(500, elapseTime, messages, error500, res);
                } else {
                    messages = "Success Delete";
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    response.successPost(elapseTime, messages, res);
                }
            });

    }
};



async function Query(sql) {
    return new Promise((resolve) =>
        connection.query(sql,
            function (error, rows) {
                if (error) {
                    return resolve(error);
                } else {

                    return resolve(rows)
                }
            })
    );
}


async function UpdateRelation(class_id, arraySection_id) {
    // get class_sections yang dimiliki class_id
    var current_class_section_sql = "SELECT * FROM class_sections WHERE class_id=" + class_id
    var ex_current_class_section = await Query(current_class_section_sql)
    var sub_class_sama = []
    var sub_class_existing = []
    var sub_class_dikirim = []
    // pengulangan untuk sub_class data yang dikirim
    for (const data of arraySection_id) {
        // menyimpan id sub_kelas yang dikirim
        sub_class_dikirim.push(data.section_id)
        // pengulangan dari data { get class_sections yang dimiliki class_id }
        for (const x_data of ex_current_class_section) {
            // menyimpan id sub_kelas {{ get class_sections yang dimiliki class_id }}
            sub_class_existing.push(x_data.section_id)
            // jika sama maka
            if (data.section_id == x_data.section_id) {
                // menyimpan id sub_kelas yang sama
                sub_class_sama.push(data.section_id)
            }
        }
    }
    // hapus data yang sama pada array
    sub_class_existing = [...new Set(sub_class_existing)];
    var sub_class_untuk_dihapus = sub_class_existing.filter(function (el) {
        return sub_class_sama.indexOf(el) < 0;
    });
    var sub_class_untuk_diinsert = sub_class_dikirim.filter(function (el) {
        return sub_class_sama.indexOf(el) < 0;
    });
    var all_message = []
    var message = {}
    if (sub_class_existing.length > 0) {
        for (const data of sub_class_existing) {
            var sql_delete = "UPDATE class_sections SET is_active='yes' WHERE section_id=" + data + " AND class_id=" + class_id
            var ex_delete = await Query(sql_delete)
            message.successInsert = data
            all_message.push(message)
            message = {}
        }
    }
    if (sub_class_untuk_dihapus.length > 0) {
        for (const data of sub_class_untuk_dihapus) {
            var sql_delete = "UPDATE class_sections SET is_active='no' WHERE section_id=" + data + " AND class_id=" + class_id
            var ex_delete = await Query(sql_delete)
            message.successDelete = data
            all_message.push(message)
            message = {}
        }
    }
    if (sub_class_untuk_diinsert.length > 0) {
        for (const data of sub_class_untuk_diinsert) {
            var query_insert = "INSERT INTO `class_sections` (`class_id`, `section_id`,`is_active`) VALUES (" + class_id + ",'" + data + "','yes')"
            var check = await Query(query_insert)
            message.successInsert = data
            all_message.push(message)
            message = {}
        }
    }

    return (all_message)
}


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
