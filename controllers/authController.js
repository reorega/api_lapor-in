const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { Buffer } = require("buffer");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/mailer");
const JWT_SECRET = "laporin_secret_key"; // nanti bisa kamu simpan di .env kalau mau lebih aman
const userModel = require("../models/userModel");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email dan password wajib diisi" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email tidak ditemukan" });
    }

    // Decode password dari database
    const decodedPassword = Buffer.from(user.password, "base64").toString(
      "utf8"
    );

    if (decodedPassword !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Password salah" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nama_lengkap: user.nama_lengkap,
        instansi_id: user.instansi_id,
        role_id: user.role_id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Gagal login", error: error.message });
  }
};

exports.logout = (req, res) => {
  // Client yang menghapus token, di sini kita hanya kasih respon sukses
  res.json({
    success: true,
    message: "Logout berhasil, token dihapus di sisi client",
  });
};

exports.requestResetCode = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findByEmail(email);
  if (!user) return res.status(404).json({ msg: "Email tidak ditemukan" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 menit

  await userModel.setResetCode(email, code, expiry);

  await sendEmail(
    email,
    "Kode Reset Password",
    `
    <p>Kode reset Anda: <strong>${code}</strong></p>
    <p>Berlaku sampai ${expiry.toLocaleTimeString()}</p>
  `
  );

  res.json({ success: true, msg: "Kode dikirim ke email Anda" });
};

exports.verifyResetCodeAndChangePassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = await userModel.findByEmail(email);

  if (
    !user ||
    user.reset_code !== code ||
    new Date(user.reset_code_expiry) < new Date()
  ) {
    return res.status(400).json({ msg: "Kode salah atau kadaluarsa" });
  }

  //const hashed = await bcrypt.hash(newPassword, 10);
  await userModel.updatePassword(email, newPassword);

  res.json({ success: true, msg: "Password berhasil diubah" });
};
