const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "laporin_secret_key"; // ganti dengan env asli kamu

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token tidak ditemukan",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token tidak valid",
      });
    }

    req.user = user; // simpan user ke req untuk digunakan di controller
    next();
  });
};

module.exports = authenticateToken;
