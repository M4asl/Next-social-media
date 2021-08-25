const express = require("express");
const { protect } = require("../controllers/authController");
const {
  createMessage,
  getMessagesByChatId,
} = require("../controllers/messageController");

const router = express.Router();

router.route("/api/messages").post(protect, createMessage);

router
  .route("/api/messages/:chatId")
  .get(protect, getMessagesByChatId);

module.exports = router;
