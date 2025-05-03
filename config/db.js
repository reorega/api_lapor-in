const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "lapor-in",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Gagal terhubung ke database:", err.message);
  } else {
    console.log("✅ Berhasil terhubung ke database");
    connection.release(); // kembalikan koneksi ke pool
  }
});

module.exports = pool.promise();
