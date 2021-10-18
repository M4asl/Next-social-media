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
    .populate("readBy", "_id name photo")
    .populate("chat")
    .execPopulate();
  message = await User.populate(message, {
    path: "chat.users",
    select: "_id name photo",
  });

  await Chat.findByIdAndUpdate(req.body.chatId, {
    latestMessage: message,
  });

  res.status(201).json(message);
});

exports.getMessagesByChatId = catchAsync(async (req, res, next) => {
  const { messagePageNumber } = req.query;
  const number = Number(messagePageNumber);
  const size = 20;
  let messages;
  if (number === 1) {
    messages = await Message.find({
      chat: req.params.chatId,
    })
      .limit(size)
      .populate("sender", "_id name photo")
      .populate("readBy", "_id name photo")
      .sort("-createdAt")
      .exec();
  } else {
    const skips = size * (number - 1);
    messages = await Message.find({
      chat: req.params.chatId,
    })
      .skip(skips)
      .limit(size)
      .populate("sender", "_id name photo")
      .populate("readBy", "_id name photo")
      .sort("-createdAt")
      .exec();
  }

  res.status(200).json(messages);
});

exports.readMessageByUser = catchAsync(async (req, res, next) => {
  await Message.updateMany(
    { chat: req.params.chatId },
    { $addToSet: { readBy: req.user._id } },
  );
  res.sendStatus(204);
});
