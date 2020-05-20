'use strict';

module.exports = function (app) {

    // Umum
    var index = require('./controller/index');
    app.route('/')
        .get(index.index);

    // Jadwal Kelas Route
    var jadwal_kelas = require('./controller/jadwal_kelas');
    app.route('/akademik/jadwal_kelas/kelas')
        .get(jadwal_kelas.kelas);
    app.route('/akademik/jadwal_kelas/kelas/:id')
        .get(jadwal_kelas.get_kelas);
    app.route('/akademik/jadwal_kelas/sub_kelas')
        .get(jadwal_kelas.sub_kelas);
    app.route('/akademik/jadwal_kelas/sub_kelas/:id')
        .get(jadwal_kelas.get_sub_kelas);
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
    app.route('/akademik/wali_kelas/guru_kelas')
        .get(wali_kelas.guru_kelas);
    app.route('/akademik/wali_kelas/guru_kelas/:id')
        .get(wali_kelas.get_guru_kelas);
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

    // Kelas
    var kelas = require('./controller/kelas');
    app.route('/akademik/kelas')
        .get(kelas.kelas);
    app.route('/akademik/kelas/:kelas_id')
        .get(kelas.get_kelas);
    app.route('/akademik/kelas')
        .put(kelas.insert_kelas);
    app.route('/akademik/kelas')
        .post(kelas.update_kelas);
    app.route('/akademik/kelas')
        .delete(kelas.delete_kelas);

    // SubKelas
    var kelas = require('./controller/sub_kelas');
    // app.route('/akademik/list_sub_kelas')
    //     .get(sub_kelas.list_sub_kelas);
    // app.route('/akademik/list_sub_kelas/:sub_kelas_id')
    //     .get(sub_kelas.list_sub_kelas);
    // app.route('/akademik/list_sub_kelas')
    //     .put(sub_kelas.insert_kelas);
    // app.route('/akademik/list_sub_kelas')
    //     .post(sub_kelas.update_kelas);
    // app.route('/akademik/list_sub_kelas')
    //     .delete(sub_kelas.delete_kelas);


};