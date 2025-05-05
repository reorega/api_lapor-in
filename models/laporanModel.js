const db = require("../config/db");

module.exports = {
  getAll: async () => {
    const [rows] = await db.query(
      `SELECT 
      l.id, 
      l.judul_laporan, 
      l.deskripsi_laporan, 
      l.lokasi, 
      l.foto_laporan, 
      DATE_FORMAT(l.tanggal, '%d-%m-%Y') AS tanggal, 
      i.nama_instansi
    FROM laporan l
    JOIN instansi i ON l.instansi_id = i.id`
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT 
      l.id, 
      l.judul_laporan, 
      l.deskripsi_laporan, 
      l.lokasi, 
      l.foto_laporan, 
      DATE_FORMAT(l.tanggal, '%d-%m-%Y') AS tanggal, 
      i.nama_instansi
    FROM laporan l
    JOIN instansi i ON l.instansi_id = i.id
    where l.id= ?`,
      [id]
    );
    return rows[0];
  },
  getMasuk: async (no) => {
    const [rows] = await db.query(
      `SELECT 
      l.id, 
      l.judul_laporan, 
      l.deskripsi_laporan, 
      l.lokasi, 
      l.foto_laporan, 
      DATE_FORMAT(l.tanggal, '%d-%m-%Y') AS tanggal, 
      i.nama_instansi
    FROM laporan l
    JOIN instansi i ON l.instansi_id = i.id
    where l.status= ?`,
      [no]
    );
    return rows;
  },
  getProses: async (no) => {
    const [rows] = await db.query(
      `SELECT 
      l.id, 
      l.judul_laporan, 
      l.deskripsi_laporan, 
      l.lokasi, 
      l.foto_laporan, 
      DATE_FORMAT(l.tanggal, '%d-%m-%Y') AS tanggal, 
      i.nama_instansi
    FROM laporan l
    JOIN instansi i ON l.instansi_id = i.id
    where l.status= ?`,
      [no]
    );
    return rows;
  },
  getSelesai: async (no) => {
    const [rows] = await db.query(
      `SELECT 
      l.id, 
      l.judul_laporan, 
      l.deskripsi_laporan, 
      l.lokasi, 
      l.foto_laporan, 
      DATE_FORMAT(l.tanggal, '%d-%m-%Y') AS tanggal, 
      i.nama_instansi
    FROM laporan l
    JOIN instansi i ON l.instansi_id = i.id
    where l.status= ?`,
      [no]
    );
    return rows;
  },
  //Create
  create: async (laporan) => {
    const [result] = await db.query(
      "INSERT INTO laporan (judul_laporan, deskripsi_laporan, tanggal, lokasi, foto_laporan, instansi_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        // laporan.kode_laporan,
        laporan.judul_laporan,
        laporan.deskripsi_laporan,
        laporan.tanggal,
        laporan.lokasi,
        laporan.foto,
        laporan.instansi_id,
        //laporan.kategori_id,
      ]
    );
    return result;
  },

  //Mencari nomor terakhir kode laporan
  getLastNumberByPrefix: async (prefix) => {
    const [rows] = await db.query(
      "SELECT kode_laporan FROM laporan WHERE kode_laporan LIKE ? ORDER BY kode_laporan DESC LIMIT 1",
      [`${prefix}%`]
    );
    return rows[0];
  },

  //Mencari nama kategori
  getCategoryNameById: async (id) => {
    const [rows] = await db.query(
      "SELECT nama_kategori FROM kategori WHERE id = ?",
      [id]
    );
    return rows[0];
  },
};
