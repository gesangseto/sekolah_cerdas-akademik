'use strict';

module.exports = function (app) {

    // Umum
    var index = require('./controller/index');
    app.route('/')
        .get(index.index);
    app.route('/akademik/kelas')
        .get(index.kelas);
    app.route('/akademik/kelas/:id')
        .get(index.get_kelas);
    app.route('/akademik/sub_kelas')
        .get(index.sub_kelas);
    app.route('/akademik/sub_kelas/:id')
        .get(index.get_sub_kelas);
    app.route('/akademik/guru_kelas')
        .get(index.guru_kelas);
    app.route('/akademik/guru_kelas/:id')
        .get(index.get_guru_kelas);

    // Jadwal Kelas Route
    var jadwal_kelas = require('./controller/jadwal_kelas');
    app.route('/akademik/jadwal_kelas/mata_pelajaran/:id')
        .get(jadwal_kelas.get_mata_pelajaran);
    app.route('/akademik/jadwal_kelas/mata_pelajaran')
        .get(jadwal_kelas.mata_pelajaran);

    app.route('/akademik/jadwal_kelas/jadwal')
        .get(jadwal_kelas.jadwal);
    app.route('/akademik/jadwal_kelas/jadwal/:id')
        .get(jadwal_kelas.get_jadwal);

    app.route('/akademik/jadwal_kelas/jadwal')
        .post(jadwal_kelas.post_jadwal_kelas);

    // Wali Kelas Route
    var wali_kelas = require('./controller/wali_kelas');
    app.route('/akademik/wali_kelas')
        .get(wali_kelas.wali_kelas);
    app.route('/akademik/wali_kelas/:id')
        .get(wali_kelas.get_wali_kelas);
    app.route('/akademik/wali_kelas')
        .post(wali_kelas.post_wali_kelas);
    app.route('/akademik/wali_kelas')
        .delete(wali_kelas.delete_wali_kelas);

};