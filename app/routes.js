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
        .put(jadwal_kelas.insert_jadwal_kelas);
    app.route('/akademik/jadwal_kelas/jadwal')
        .post(jadwal_kelas.update_jadwal_kelas);

    // Wali Kelas Route
    var wali_kelas = require('./controller/wali_kelas');
    app.route('/akademik/wali_kelas')
        .get(wali_kelas.wali_kelas);
    app.route('/akademik/wali_kelas/:id')
        .get(wali_kelas.get_wali_kelas);
    app.route('/akademik/wali_kelas')
        .post(wali_kelas.update_wali_kelas);
    app.route('/akademik/wali_kelas')
        .put(wali_kelas.insert_wali_kelas);
    app.route('/akademik/wali_kelas')
        .delete(wali_kelas.delete_wali_kelas);


    // Guru mata_pelajaran Route
    var guru_mata_pelajaran = require('./controller/guru_mata_pelajaran');
    app.route('/akademik/guru_mata_pelajaran')
        .get(guru_mata_pelajaran.guru_mata_pelajaran);
    app.route('/akademik/guru_mata_pelajaran')
        .post(guru_mata_pelajaran.post_guru_mata_pelajaran);
    app.route('/akademik/guru_mata_pelajaran')
        .delete(guru_mata_pelajaran.delete_guru_mata_pelajaran);

    // Daftar Mata Pelajaran
    var daftar_mata_pelajaran = require('./controller/daftar_mata_pelajaran');
    app.route('/akademik/daftar_mata_pelajaran')
        .get(daftar_mata_pelajaran.list_mata_pelajaran);
    app.route('/akademik/daftar_mata_pelajaran/:id')
        .get(daftar_mata_pelajaran.get_mata_pelajaran);
    app.route('/akademik/daftar_mata_pelajaran')
        .put(daftar_mata_pelajaran.insert_mata_pelajaran);
    app.route('/akademik/daftar_mata_pelajaran')
        .post(daftar_mata_pelajaran.update_mata_pelajaran);
    app.route('/akademik/daftar_mata_pelajaran')
        .delete(daftar_mata_pelajaran.delete_mata_pelajaran);
};