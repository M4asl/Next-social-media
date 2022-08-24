const express = require("express");
const {
  register,
  login,
  getCurrentUserProfile,
  protect,
  logout,
} = require("../controllers/authController");

const router = express.Router();

router.route("/api/auth/register").post(register);
router.route("/api/auth/login").post(login);
router.route("/api/auth/me").get(protect, getCurrentUserProfile);
router.route("/api/auth/logout").get(logout);

module.exports = router;
