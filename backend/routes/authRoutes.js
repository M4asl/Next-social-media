const express = require("express");
const {
  register,
  login,
  getCurrentUserProfile,
  protect,
} = require("../controllers/authController");

const router = express.Router();

router.route("/api/auth/register").post(register);
router.route("/api/auth/login").post(login);
router.route("/api/auth/me").get(protect, getCurrentUserProfile);

module.exports = router;
