const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", userController.getUsers);
router.get("/me", authenticateToken, userController.getMe);
router.get("/me/detail", authenticateToken, userController.getMeDetail);
router.post("/me/update", authenticateToken, userController.updateUser);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/gantiPassword", authenticateToken, userController.gantiPassword);

module.exports = router;
