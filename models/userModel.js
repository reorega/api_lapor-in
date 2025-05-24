const db = require("../config/db");

module.exports = {
  getAll: async () => {
    const [rows] = await db.query(
      "SELECT id, nama_lengkap, hp, email FROM users"
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT id, nama_lengkap, hp, email FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  create: async (user) => {
    const encodedPassword = Buffer.from(user.password).toString("base64");
    const [result] = await db.query(
      "INSERT INTO users (nama_lengkap, hp, email, password) VALUES (?, ?, ?, ?)",
      [user.nama_lengkap, user.hp, user.email, encodedPassword]
    );
    return {
      id: result.insertId,
      nama_lengkap: user.nama_lengkap,
      hp: user.hp,
      email: user.email,
    };
  },

  update: async (id, newData) => {
    //const encodedPassword = Buffer.from(newData.password).toString("base64");
    await db.query(
      "UPDATE users SET nama_lengkap = ?, hp = ?, email = ?, alamat = ? WHERE id = ?",
      [newData.nama_lengkap, newData.hp, newData.email, newData.alamat, id]
    );
    return {
      id,
      nama_lengkap: newData.nama_lengkap,
      hp: newData.hp,
      email: newData.email,
      alamat: newData.alamat,
    };
  },

  remove: async (id) => {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
  },

  getMe: async (id) => {
    const [rows] = await db.query(
      "SELECT id, nama_lengkap FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  getMeDetail: async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },
};
