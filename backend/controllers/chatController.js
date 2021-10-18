const { isValidObjectId, Types } = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

exports.createChat = catchAsync(async (req, res, next) => {
  if (!req.body.users) {
    return next(
      new AppError("You can't create chat without users.", 400),
    );
  }

  const users = await User.find({ _id: req.body.users });

  if (users.length == 0) {
    return next(new AppError("Must add minimum one person.", 400));
  }

  if (
    users.length == 1 &&
    req.body.users.toString() == req.user._id
  ) {
    return next(
      new AppError(
        "You can't create chat beacuse you added your profile.",
        400,
      ),
    );
  }

  if (users.length > 1) {
    const currentUser = req.body.users.find(
      (user) => user == req.user._id,
    );

    if (currentUser) {
      return next(
        new AppError(
          "You can't create chat beacuse you added your profile.",
          400,
        ),
      );
    }
  }

  users.push(req.user);

  // if chat exist return this chat or create new
  if (users.length == 2) {
    const chat = await getChatByUserId(req.user._id, req.body.users);
    res.status(200).json(chat);
  } else if (users.length > 2) {
    const chatData = {
      users,
      isGroupChat: true,
    };

    let chat = await Chat.create(chatData);
    chat = await chat.populate("users", "_id name").execPopulate();

    res.status(201).json(chat);
  }
});

exports.getChatsUser = catchAsync(async (req, res, next) => {
  let chatsUser = await Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate("users", "_id name photo")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .exec();

  chatsUser = await User.populate(chatsUser, {
    path: "latestMessage.sender",
    select: "_id name",
  });

  res.status(200).json(chatsUser);
});

exports.getChatById = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { chatId } = req.params;
  const isValidId = isValidObjectId(chatId);

  if (!isValidId) {
    return next(
      new AppError(
        "Chat does not exist or you do not have permission to view it.",
        400,
      ),
    );
  }

  let chat = await Chat.findOne({
    _id: chatId,
    users: { $elemMatch: { $eq: userId } },
  })
    .populate("users", "_id name photo")
    .populate("latestMessage")
    .exec();

  chat = await User.populate(chat, {
    path: "latestMessage.readBy",
    select: "_id name",
  });

  if (chat == null) {
    const userByChatId = await User.findById(chatId);

    if (userByChatId != null) {
      chat = await getChatByUserId(userId, userByChatId._id);
    }
  }

  if (chat == null) {
    return next(
      new AppError(
        "Chat does not exist or you do not have permission to view it",
        400,
      ),
    );
  }

  res.status(200).json(chat);
});

// get chat by user id or create new chat or update if chat exist.
const getChatByUserId = (userLoggedInId, otherUserId) =>
  Chat.findOneAndUpdate(
    {
      isGroupChat: false,
      users: {
        $size: 2,
        $all: [
          {
            $elemMatch: {
              $eq: Types.ObjectId(userLoggedInId),
            },
          },
          {
            $elemMatch: {
              $eq: Types.ObjectId(otherUserId),
            },
          },
        ],
      },
    },
    {
      $setOnInsert: {
        users: [userLoggedInId, otherUserId],
      },
    },
    {
      new: true,
      upsert: true,
    },
  ).populate("users", "_id name photo");
