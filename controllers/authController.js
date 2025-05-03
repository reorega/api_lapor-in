const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { Buffer } = require("buffer");

const JWT_SECRET = "laporin_secret_key"; // nanti bisa kamu simpan di .env kalau mau lebih aman

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
      { id: user.id, email: user.email, nama_lengkap: user.nama_lengkap },
      JWT_SECRET,
      { expiresIn: "1h" } // token berlaku 1 jam
    );

    res.json({ success: true, message: "Login berhasil", token });
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
