'use strict';
let response = require('../response');
let connection = require('../connection');
let moment = require('moment');

const perf = require('execution-time')();
var dateFormat = require('dateformat');
var datetime = require('node-datetime');

let dt = datetime.create();
let error500 = "Internal Server Error";
let error401 = "Unathorized";
let elapseTime = "";

async function getSecret(secret_key, res) {
    return new Promise((resolve) =>
        connection.query('SELECT id FROM secret WHERE secret_key = ?', [secret_key], function (error, rows) {
            if (error) {
                return resolve(error)
            } else {
                return rows.length > 0 ? resolve(rows[0].id) : resolve(false);
            }
        })
    );
}

async function check_token(request, res) {
    let now = moment().format('YYYY-MM-DD HH:mm:ss').toString();
    perf.start();
    console.log("date-time :" + new Date())
    console.log("api-name : " + request.originalUrl)
    console.log("body-sent : ")
    console.log(request.body)
    // let username = request.body.username;
    let token = request.headers['token'];
    let secret_key = request.headers['secret-key']
    let secret_id = await getSecret(secret_key);
    // return
    if (!secret_id || !token) {
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        return response.error(401, elapseTime, 'wrong token or secret-key', error401, res)
    } else {
        let check_token = `SELECT * 
        FROM staff_authentication as a
        JOIN staff as b ON a.staff_id = b.id
        WHERE token=?`;
        let data = await new Promise((resolve) =>
            connection.query(check_token, [token], function (error, rows) {
                if (error) {
                    console.log(error)
                    elapseTime = perf.stop();
                    elapseTime = elapseTime.time.toFixed(2);
                    return response.error(500, elapseTime, `${error}`, error500, res)
                }
                if (rows.length > 0) {
                    let data = {
                        token: token,
                        expired_at: rows[0].expired_at
                    };
                    return resolve(data)
                }
                else {
                    return resolve(false);
                }
            })
        );
        elapseTime = perf.stop();
        elapseTime = elapseTime.time.toFixed(2);
        console.log(data)
        if (!data) {
            return response.error(401, elapseTime, 'wrong token', error401, res)
        }
        else {
            if (moment(data.expired_at).format('YYYY-MM-DD HH:mm:ss').toString() > now) {
                return res
            } else {
                return response.error(401, elapseTime, 'token expired', error401, res)
            }
        }

    }


}


module.exports = {
    check_token,
    getSecret
};