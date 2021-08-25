const Chat = require("../models/chatModel");
const Message = require("../models/messageModel.js");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.createMessage = catchAsync(async (req, res, next) => {
  if (!req.body.content || !req.body.chatId) {
    return next(
      new AppError("Invalid data passed into request", 400),
    );
  }

  const newMessage = {
    sender: req.user._id,
    content: req.body.content,
    chat: req.body.chatId,
  };

  let message = await Message.create(newMessage);
  message = await message
    .populate("sender", "_id name")
    .populate("chat")
    .execPopulate();
  message = await User.populate(message, {
    path: "chat.users",
    select: "_id name",
  });

  //   const chat = await Chat.findByIdAndUpdate(req.body.chatId, {
  //     latestMessage: message,
  //   });

  res.status(201).json(message);
});

exports.getMessagesByChatId = catchAsync(async (req, res, next) => {
  const messages = await Message.find({
    chat: req.params.chatId,
  }).populate("sender", "_id name photo");

  res.status(200).json(messages);
});
