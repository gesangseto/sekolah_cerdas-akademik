'use strict';

module.exports = function (app) {

    // Umum
    var index = require('./controller/index');
    app.route('/')
        .get(index.index);
    app.route('/akademik/kelas')
        .get(index.kelas);
    app.route('/akademik/sub_kelas')
        .get(index.sub_kelas);
    app.route('/akademik/guru_kelas')
        .get(index.guru_kelas);

    // Jadwal Kelas Route
    var jadwal_kelas = require('./controller/jadwal_kelas');
    app.route('/akademik/mata_pelajaran')
        .get(jadwal_kelas.mata_pelajaran);
    app.route('/akademik/jadwal_kelas')
        .get(jadwal_kelas.jadwal_kelas);
    app.route('/akademik/jadwal_kelas/change')
        .post(jadwal_kelas.change_jadwal_kelas);

    // Wali Kelas Route
    var wali_kelas = require('./controller/wali_kelas');

};