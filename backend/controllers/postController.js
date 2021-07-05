const multer = require("multer");
const sharp = require("sharp");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

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

exports.uploadPostPhoto = upload.single("photo");

exports.resizePostPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.params.userId}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`dist/img/posts/${req.file.filename}`);

  next();
});

exports.listNewsFeed = catchAsync(async (req, res) => {
  const { pageNumber } = req.query;
  const number = Number(pageNumber);
  const size = 3;
  const user = await User.findById(req.params.userId);
  const { following, _id } = user;
  following.push(_id);
  let posts;
  if (number === 1) {
    posts = await Post.find({
      postedBy: { $in: following },
    })
      .limit(size)
      .populate("likes", "_id name")
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name photo")
      .sort("-created")
      .exec();
  } else {
    const skips = size * (number - 1);
    posts = await Post.find({
      postedBy: { $in: following },
    })
      .skip(skips)
      .limit(size)
      .populate("likes", "_id name")
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name photo")
      .sort("-created")
      .exec();
  }

  res.json(posts);
});

exports.listByUser = catchAsync(async (req, res) => {
  const posts = await Post.find({ postedBy: req.params.userId })
    .populate("likes", "_id name")
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name photo")
    .sort("-created")
    .exec();

  res.json(posts);
});

exports.createPost = catchAsync(async (req, res) => {
  const postFormData = {
    text: req.body.text,
    postedBy: req.params.userId,
    photo: req.file?.filename,
  };
  const post = await Post.create(postFormData);

  res.json(post);
});

exports.removePost = catchAsync(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.postId);
  return res.status(204).json(post);
});
