const express = require("express");
const router = express.Router();
const laporanController = require("../controllers/laporanController");
const multer = require("multer");
const path = require("path");

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/laporan"); // Folder untuk simpan file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // contoh: 1716429234.jpg
  },
});
const upload = multer({ storage: storage });

router.get("/", laporanController.getLaporan);
router.get("/masuk", laporanController.getLaporanMasuk);
router.get("/proses", laporanController.getLaporanProses);
router.get("/selesai", laporanController.getLaporanSelesai);
router.get("/:id", laporanController.getLaporanId);
router.post("/", upload.single("foto"), laporanController.createLaporan);

module.exports = router;
