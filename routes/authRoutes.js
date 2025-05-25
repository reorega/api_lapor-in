const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/request-reset", authController.requestResetCode);
router.post("/verify-reset", authController.verifyResetCodeAndChangePassword);
module.exports = router;
