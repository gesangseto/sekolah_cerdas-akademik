'use strict';

module.exports = function (app) {
    var index = require('./controller/index');
    var jadwal_kelas = require('./controller/jadwal_kelas');
    app.route('/')
        .get(index.index);

    app.route('/akademik/kelas')
        .get(jadwal_kelas.kelas);

    app.route('/akademik/sub_kelas')
        .get(jadwal_kelas.sub_kelas);

    app.route('/akademik/mata_pelajaran')
        .get(jadwal_kelas.mata_pelajaran);

    app.route('/akademik/jadwal_kelas')
        .get(jadwal_kelas.jadwal_kelas);

    // app.route('/akademik/jadwal_kelas/:class_section_id')
    // .post(jadwal_kelas.jadwal_kelas);

};