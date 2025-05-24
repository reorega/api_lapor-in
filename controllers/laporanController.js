const laporanModel = require("../models/laporanModel");
const path = require("path");

exports.createLaporan = async (req, res) => {
  const userId = req.user.id;
  try {
    const {
      // kategori_id,
      instansi_id,
      judul_laporan,
      deskripsi_laporan,
      lokasi,
    } = req.body;
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "Foto wajib diunggah" });
    }
    /*
    // Ambil nama kategori
    const category = await laporanModel.getCategoryNameById(kategori_id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Kategori tidak ditemukan" });
    }

    const prefix = category.nama_kategori.substring(0, 3).toUpperCase();

    // Ambil kode terakhir
    const lastLaporan = await laporanModel.getLastNumberByPrefix(prefix);
    let nextNumber = "0001";
    if (lastLaporan) {
      const lastNumber = parseInt(lastLaporan.kode_laporan.substring(3));
      nextNumber = String(lastNumber + 1).padStart(4, "0");
    }

    const kode_laporan = prefix + nextNumber;
    */

    // Format tanggal sekarang
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January = 0
    const yy = String(today.getFullYear()).substring(2);
    const tanggal = dd + mm + yy;

    // Simpan data
    const laporanData = {
      //kode_laporan,
      judul_laporan,
      deskripsi_laporan,
      tanggal,
      lokasi,
      foto: file.filename,
      status_laporan: "1",
      instansi_id,
      userId,
      //kategori_id,
    };

    await laporanModel.create(laporanData);

    res.status(201).json({
      success: true,
      message: "Laporan berhasil dibuat",
      data: laporanData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal membuat laporan",
      error: error.message,
    });
  }
};
exports.getLaporan = async (req, res) => {
  try {
    const users = await laporanModel.getAll();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data laporan",
      error: error.message,
    });
  }
};
exports.getLaporanId = async (req, res) => {
  try {
    const laporan = await laporanModel.getById(parseInt(req.params.id));
    if (laporan) {
      res.json({ success: true, data: laporan });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Laporan tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data laporan",
      error: error.message,
    });
  }
};
exports.getLaporanMasuk = async (req, res) => {
  const userId = req.user.id;
  try {
    const laporan = await laporanModel.getMasuk(1, userId);
    if (laporan) {
      res.json({ success: true, data: laporan });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Laporan tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data laporan",
      error: error.message,
    });
  }
};
exports.getLaporanProses = async (req, res) => {
  try {
    const laporan = await laporanModel.getProses(2);
    if (laporan) {
      res.json({ success: true, data: laporan });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Laporan tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data laporan",
      error: error.message,
    });
  }
};
exports.getLaporanSelesai = async (req, res) => {
  try {
    const laporan = await laporanModel.getSelesai(3);
    if (laporan) {
      res.json({ success: true, data: laporan });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Laporan tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data laporan",
      error: error.message,
    });
  }
};

exports.getDashboard = async (req, res) => {
  const instansiId = req.user.instansi_id;
  try {
    const laporan = await laporanModel.getDashboard(instansiId);
    if (laporan) {
      res.json({ success: true, data: laporan });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Laporan tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data dashboard",
      error: error.message,
    });
  }
};

exports.getLaporanAdmin = async (req, res) => {
  const instansiId = req.user.instansi_id;
  try {
    const laporan = await laporanModel.getLaporanAdmin(instansiId);
    if (laporan) {
      res.json({ success: true, data: laporan });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Laporan tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data dashboard",
      error: error.message,
    });
  }
};

exports.getLaporanIdAdmin = async (req, res) => {
  try {
    const laporan = await laporanModel.getByIdAdmin(parseInt(req.params.id));
    if (laporan) {
      res.json({ success: true, data: laporan });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Laporan tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data laporan",
      error: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  console.log("BODY DI AUTH MIDDLEWARE:", req.body);
  const statusId = req.body.status_id;
  try {
    const laporan = await laporanModel.updateStatus(
      parseInt(req.params.id),
      statusId
    );
    if (laporan) {
      res.json({ success: true, data: laporan });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Laporan tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data laporan",
      error: error.message,
    });
  }
};
