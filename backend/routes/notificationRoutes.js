const express = require("express");
const {
  getNotificationByUser,
} = require("../controllers/notificationController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router
  .route("/api/notifications")
  .get(protect, getNotificationByUser);

module.exports = router;
