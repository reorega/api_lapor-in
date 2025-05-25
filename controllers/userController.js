const userModel = require("../models/userModel");
const { Buffer } = require("buffer");

function validateUser(data) {
  if (!data.nama_lengkap || !data.hp || !data.email || !data.password) {
    return "Semua field (nama_lengkap, hp, email, password) wajib diisi";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return "Format email tidak valid";
  }

  if (data.hp.length < 10 || data.hp.length > 15) {
    return "Nomor HP harus antara 10 hingga 15 digit";
  }

  return null;
}

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.getAll();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data users",
      error: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userModel.getById(parseInt(req.params.id));
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil user",
      error: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const validationError = validateUser(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const newUser = await userModel.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "User berhasil dibuat", data: newUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Gagal membuat user",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const validationError = validateUser(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const updated = await userModel.update(req.user.id, req.body);
    if (updated) {
      res.json({
        success: true,
        message: "User berhasil diupdate",
        data: updated,
      });
    } else {
      res.status(404).json({ success: false, message: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Gagal mengupdate user",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userModel.remove(parseInt(req.params.id));
    res.status(200).json({ success: true, message: "User berhasil dihapus" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Gagal menghapus user",
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const users = await userModel.getMe(userId);
    if (users) {
      res.json({ success: true, data: users });
    } else {
      res.status(404).json({ success: false, message: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data users",
      error: error.message,
    });
  }
};

exports.getMeDetail = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const users = await userModel.getMeDetail(userId);
    if (users) {
      res.json({ success: true, data: users });
    } else {
      res.status(404).json({ success: false, message: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data users",
      error: error.message,
    });
  }
};

exports.gantiPassword = async (req, res) => {
  const id = req.user.id;
  const pwLama = req.body.currentPassword;
  const pwBaru = req.body.newPassword;
  const users = await userModel.getByIdNew(id);
  const decodedPassword = Buffer.from(users.password, "base64").toString(
    "utf8"
  );
  if (pwLama != decodedPassword) {
    res.status(404).json({ success: false, message: "Password lama salah" });
  }
  if (pwLama == pwBaru) {
    res
      .status(404)
      .json({ success: false, message: "Password sama password sebelumnya" });
  }
  try {
    const ganti = await userModel.gantiPw(id, pwBaru);
    if (ganti) {
      res.json({ success: true, data: ganti });
    } else {
      res.status(404).json({ success: false, message: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data users",
      error: error.message,
    });
  }
};
