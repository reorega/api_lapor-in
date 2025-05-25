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
  getByIdNew: async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
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

  findByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },

  setResetCode: async (email, code, expiry) => {
    await db.query(
      "UPDATE users SET reset_code = ?, reset_code_expiry = ? WHERE email = ?",
      [code, expiry, email]
    );
  },

  updatePassword: async (email, Password) => {
    const encodedPassword = Buffer.from(Password).toString("base64");
    await db.query(
      "UPDATE users SET password = ?, reset_code = NULL, reset_code_expiry = NULL WHERE email = ?",
      [encodedPassword, email]
    );
  },

  gantiPw: async (id, Password) => {
    const encodedPassword = Buffer.from(Password).toString("base64");
    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      encodedPassword,
      id,
    ]);
    const [updatedRows] = await db.query(`SELECT * FROM users WHERE id = ?`, [
      id,
    ]);

    return updatedRows[0];
  },
};
