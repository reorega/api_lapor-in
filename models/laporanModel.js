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
  getMasuk: async (no, userId) => {
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
    WHERE l.user_id = ? AND l.status_id = ?`,
      [userId, no]
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
    where l.status_id= ?`,
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
    where l.status_id= ?`,
      [no]
    );
    return rows;
  },
  //Create
  create: async (laporan) => {
    const [result] = await db.query(
      "INSERT INTO laporan (judul_laporan, deskripsi_laporan, tanggal, lokasi, foto_laporan, instansi_id,user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        // laporan.kode_laporan,
        laporan.judul_laporan,
        laporan.deskripsi_laporan,
        laporan.tanggal,
        laporan.lokasi,
        laporan.foto,
        laporan.instansi_id,
        laporan.userId,
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

  getDashboard: async (instansiId) => {
    const [rows] = await db.query(
      `SELECT
      COUNT(*) AS total_laporan,
      SUM(CASE WHEN l.status_id = 1 THEN 1 ELSE 0 END) AS status_1,
      SUM(CASE WHEN l.status_id = 2 THEN 1 ELSE 0 END) AS status_2,
      SUM(CASE WHEN l.status_id = 3 THEN 1 ELSE 0 END) AS status_3
    FROM laporan l
    WHERE l.instansi_id = ?`,
      [instansiId]
    );
    return rows[0];
  },

  getLaporanAdmin: async (instansiId) => {
    const [rows] = await db.query(
      `SELECT 
      l.id,
      DATE_FORMAT(l.tanggal, '%d-%m-%Y') AS tanggal,
      u.nama_lengkap, 
      u.hp, 
      l.judul_laporan, 
      l.lokasi, 
      s.status
    FROM laporan l
    JOIN instansi i ON l.instansi_id = i.id
    JOIN users u on l.user_id = u.id
    JOIN status s on l.status_id = s.id
    where l.instansi_id= ?`,
      [instansiId]
    );
    return rows;
  },

  getByIdAdmin: async (id) => {
    const [rows] = await db.query(
      `SELECT 
      l.id,
      DATE_FORMAT(l.tanggal, '%d-%m-%Y') AS tanggal,
      u.nama_lengkap, 
      u.hp,
      u.email, 
      l.judul_laporan,
      l.deskripsi_laporan,
      l.foto_laporan, 
      l.lokasi,
      l.status_id, 
      s.status
    FROM laporan l
    JOIN instansi i ON l.instansi_id = i.id
    JOIN users u on l.user_id = u.id
    JOIN status s on l.status_id = s.id
    where l.id= ?`,
      [id]
    );
    return rows[0];
  },

  updateStatus: async (id, statusId) => {
    const [result] = await db.query(
      `UPDATE laporan SET status_id = ? WHERE id = ?`,
      [statusId, id]
    );

    if (result.affectedRows === 0) {
      return null; // tidak ada yang diupdate (ID tidak ditemukan)
    }

    // Ambil data yang sudah diupdate untuk dikirim ke FE
    const [updatedRows] = await db.query(`SELECT * FROM laporan WHERE id = ?`, [
      id,
    ]);

    return updatedRows[0];
  },
};
