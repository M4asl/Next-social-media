const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { createSendToken } = require("./authController");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("Not an image! Please upload only images.", 400),
      false,
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.params.userId}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`dist/img/users/${req.file.filename}`);

  next();
});

exports.getAllUsers = catchAsync(async (req, res) => {
  let searchObj = req.query;

  if (req.query.search !== undefined) {
    searchObj = {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    };
  }

  const users = await User.find(searchObj).select(
    "name email created photo",
  );
  res.status(200).json(users);
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId)
    .populate("liked", "_id text")
    .populate("following", "_id, name")
    .populate("followers", "_id, name");
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  return res.status(200).json(user);
});

const filterObjField = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword",
      ),
    );
  }
  const filteredBodyField = filterObjField(
    req.body,
    "name",
    "email",
    "about",
  );
  if (req.file) filteredBodyField.photo = req.file.filename;

  const user = await User.findByIdAndUpdate(
    req.params.userId,
    filteredBodyField,
    { new: true, runValidators: true },
  );
  createSendToken(user, 200, req, res);
});

exports.removeUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.userId);
  if (!user) {
    return next(new AppError("Not found user", 404));
  }
  return res.status(204).json(null);
});

exports.addFollowing = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.body.userId, {
    $push: { following: req.body.followId },
  });
  next();
});

exports.addFollower = catchAsync(async (req, res) => {
  const result = await User.findByIdAndUpdate(
    req.body.followId,
    { $push: { followers: req.body.userId } },
    { new: true },
  )
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec();
  res.json(result);
});

exports.removeFollowing = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.body.userId, {
    $pull: { following: req.body.unfollowId },
  });
  next();
});

exports.removeFollower = catchAsync(async (req, res) => {
  const result = await User.findByIdAndUpdate(
    req.body.unfollowId,
    { $pull: { followers: req.body.userId } },
    { new: true },
  )
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec();
  res.json(result);
});

exports.findPeople = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId);
  const { following } = user;
  following.push(user._id);

  const users = await User.find({ _id: { $nin: following } }).select(
    "name",
  );
  res.json(users);
});
