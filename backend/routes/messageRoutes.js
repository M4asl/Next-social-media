const express = require("express");
const { protect } = require("../controllers/authController");
const {
  createMessage,
  getMessagesByChatId,
  readMessageByUser,
} = require("../controllers/messageController");

const router = express.Router();

router.route("/api/messages").post(protect, createMessage);

router
  .route("/api/messages/:chatId")
  .get(protect, getMessagesByChatId);

router
  .route("/api/messages/:chatId/markAsRead")
  .put(protect, readMessageByUser);

module.exports = router;
