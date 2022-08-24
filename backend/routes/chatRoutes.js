const express = require("express");
const { protect } = require("../controllers/authController");
const {
  createChat,
  getChatById,
  getChatsUser,
} = require("../controllers/chatController");

const router = express.Router();

router
  .route("/api/chats")
  .post(protect, createChat)
  .get(protect, getChatsUser);

router.route("/api/chats/:chatId").get(protect, getChatById);

module.exports = router;
