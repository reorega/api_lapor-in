const express = require("express");
const router = express.Router();
const laporanController = require("../controllers/laporanController");
const authenticateToken = require("../middleware/authMiddleware");
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
router.get("/masuk", authenticateToken, laporanController.getLaporanMasuk);
router.get("/proses", authenticateToken, laporanController.getLaporanProses);
router.get("/selesai", authenticateToken, laporanController.getLaporanSelesai);
router.get("/detail/:id", authenticateToken, laporanController.getLaporanId);
router.get(
  "/detailAdmin/:id",
  authenticateToken,
  laporanController.getLaporanIdAdmin
);
router.post(
  "/",
  upload.single("foto"),
  authenticateToken,
  laporanController.createLaporan
);
router.post(
  "/updateStatus/:id",
  authenticateToken,
  laporanController.updateStatus
);
router.get("/dashboard", authenticateToken, laporanController.getDashboard);
router.get("/admin", authenticateToken, laporanController.getLaporanAdmin);

module.exports = router;
