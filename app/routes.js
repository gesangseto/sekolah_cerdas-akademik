'use strict';

module.exports = function (app) {

    // // Jadwal Kelas Route
    // var jadwal_kelas = require('./controller/jadwal_kelas');
    // app.route('/akademik/jadwal_kelas/classes')
    //     .get(jadwal_kelas.classes);
    // app.route('/akademik/jadwal_kelas/section')
    //     .get(jadwal_kelas.section);
    // app.route('/akademik/jadwal_kelas/class_section')
    //     .get(jadwal_kelas.class_section);
    // app.route('/akademik/jadwal_kelas/teacher_subject')
    //     .get(jadwal_kelas.teacher_subject);
    // app.route('/akademik/jadwal_kelas/subject')
    //     .get(jadwal_kelas.subject);

    // app.route('/akademik/jadwal_kelas/jadwal/:id')
    //     .get(jadwal_kelas.get_jadwal);
    // app.route('/akademik/jadwal_kelas/jadwal')
    //     .put(jadwal_kelas.insert_jadwal_kelas);
    // app.route('/akademik/jadwal_kelas/jadwal')
    //     .post(jadwal_kelas.update_jadwal_kelas);

    // // Wali Kelas Route
    // var wali_kelas = require('./controller/wali_kelas');
    // app.route('/akademik/wali_kelas/guru_kelas')
    //     .get(wali_kelas.guru_kelas);
    // app.route('/akademik/wali_kelas/guru_kelas/:id')
    //     .get(wali_kelas.get_guru_kelas);
    // app.route('/akademik/wali_kelas')
    //     .get(wali_kelas.wali_kelas);
    // app.route('/akademik/wali_kelas/:id')
    //     .get(wali_kelas.get_wali_kelas);
    // app.route('/akademik/wali_kelas')
    //     .post(wali_kelas.update_wali_kelas);
    // app.route('/akademik/wali_kelas')
    //     .put(wali_kelas.insert_wali_kelas);
    // app.route('/akademik/wali_kelas')
    //     .delete(wali_kelas.delete_wali_kelas);


    // // Guru mata_pelajaran Route
    // var guru_mata_pelajaran = require('./controller/guru_mata_pelajaran');
    // app.route('/akademik/guru_mata_pelajaran/classes')
    //     .get(guru_mata_pelajaran.classes);
    // app.route('/akademik/guru_mata_pelajaran/section')
    //     .get(guru_mata_pelajaran.section);
    // app.route('/akademik/guru_mata_pelajaran/class_section')
    //     .get(guru_mata_pelajaran.class_section);
    // app.route('/akademik/guru_mata_pelajaran/class_section')
    //     .get(guru_mata_pelajaran.class_section);


    // app.route('/akademik/guru_mata_pelajaran/teacher_subject')
    //     .get(guru_mata_pelajaran.teacher_subject);
    // app.route('/akademik/guru_mata_pelajaran/teacher_subject')
    //     .put(guru_mata_pelajaran.insert_guru_matapelajaran);
    // app.route('/akademik/guru_mata_pelajaran')
    //     .post(guru_mata_pelajaran.post_guru_mata_pelajaran);
    // app.route('/akademik/guru_mata_pelajaran')
    //     .delete(guru_mata_pelajaran.delete_guru_mata_pelajaran);

    // // Daftar Mata Pelajaran
    var daftar_mata_pelajaran = require('./controller/daftar-mata-pelajaran');
    app.route('/akademik/daftar-mata-pelajaran')
        .get(daftar_mata_pelajaran.getMataPelajaran);
    app.route('/akademik/daftar-mata-pelajaran')
        .put(daftar_mata_pelajaran.insertMataPelajaran);
    app.route('/akademik/daftar-mata-pelajaran')
        .post(daftar_mata_pelajaran.updateMataPelajaran);
    app.route('/akademik/daftar-mata-pelajaran')
        .delete(daftar_mata_pelajaran.deleteMataPelajaran);

    // // Kelas
    var kelas = require('./controller/kelas');
    app.route('/akademik/kelas')
        .get(kelas.getClass);
    app.route('/akademik/kelas')
        .delete(kelas.deleteClass);
    app.route('/akademik/kelas-section')
        .get(kelas.getSectionClass);
    app.route('/akademik/kelas-section')
        .put(kelas.insertSectionClass);
    app.route('/akademik/kelas-section')
        .post(kelas.updateSectionClass);
    app.route('/akademik/kelas-section')
        .delete(kelas.deleteSectionClass);

    // SubKelas
    var sub_kelas = require('./controller/sub-kelas');
    app.route('/akademik/sub-kelas')
        .get(sub_kelas.getSection);
    app.route('/akademik/sub-kelas')
        .put(sub_kelas.insertSection);
    app.route('/akademik/sub-kelas')
        .post(sub_kelas.updateSection);
    app.route('/akademik/sub-kelas')
        .delete(sub_kelas.deleteSection);


};