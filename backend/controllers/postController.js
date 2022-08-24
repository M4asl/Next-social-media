const multer = require("multer");
const sharp = require("sharp");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const {
  newLikeNotifiaction,
  newCommentNotification,
  removeLikeNotification,
  removeCommentNotification,
} = require("./notificationController");
const { v4: uuidv4 } = require("uuid");

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
  const user = await User.findById(req.user._id);
  const { following, _id } = user;
  following.push(_id);
  let posts;
  if (number === 1) {
    posts = await Post.find({
      postedBy: { $in: following },
    })
      .limit(size)
      .populate("likes", "_id name")
      .populate("comments.postedBy", "_id name photo")
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
      .populate("comments.postedBy", "_id name photo")
      .populate("postedBy", "_id name photo")
      .sort("-created")
      .exec();
  }

  res.json(posts);
});

exports.listByUser = catchAsync(async (req, res) => {
  const posts = await Post.find({ postedBy: req.params.userId })
    .populate("likes", "_id name")
    .populate("comments.postedBy", "_id name photo")
    .populate("postedBy", "_id name photo")
    .sort("-created")
    .exec();

  res.json(posts);
});

exports.createPost = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId).select(
    "_id name photo",
  );
  const postFormData = {
    text: req.body.text,
    postedBy: user,
    photo: req.file?.filename,
  };
  const post = await Post.create(postFormData);

  res.json(post);
});

exports.removePost = catchAsync(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.postId);
  return res.status(204).json(post);
});

exports.likePost = catchAsync(async (req, res, next) => {
  const likedPost = await Post.findById(req.body.postId);

  const isLiked =
    likedPost.likes.filter(
      (like) => like.toString() === req.body.likeId,
    ).length > 0;
  if (isLiked) {
    return next(new AppError("Post already liked", 404));
  }

  await Post.findByIdAndUpdate(req.body.postId, {
    $push: { likes: req.body.likeId },
  });
  const userToNotifyId = likedPost.postedBy;
  await newLikeNotifiaction(
    req.body.likeId,
    req.body.postId,
    userToNotifyId,
  );
  next();
});

exports.likedPost = catchAsync(async (req, res) => {
  const result = await User.findByIdAndUpdate(
    req.body.likeId,
    { $push: { liked: req.body.postId } },
    { new: true },
  )
    .select("liked")
    .populate("liked", "_id text")
    .exec();
  res.json(result);
});

exports.unlikePost = catchAsync(async (req, res, next) => {
  const unlikedPost = await Post.findById(req.body.postId);

  const isUnliked = unlikedPost.likes.find(
    (like) => like.toString() === req.body.unlikeId,
  );

  if (!isUnliked) {
    return next(new AppError("Post already unliked", 404));
  }

  await Post.findByIdAndUpdate(req.body.postId, {
    $pull: { likes: req.body.unlikeId },
  });
  const userToNotifyId = unlikedPost.postedBy;
  await removeLikeNotification(
    req.body.unlikeId,
    req.body.postId,
    userToNotifyId,
  );
  next();
});

exports.unlikedPost = catchAsync(async (req, res) => {
  const result = await User.findByIdAndUpdate(
    req.body.unlikeId,
    { $pull: { liked: req.body.postId } },
    { new: true },
  )
    .populate("liked", "_id name")
    .exec();
  res.json(result);
});

exports.findLikesPost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  const { likes } = post;
  const users = await User.find({ _id: { $in: likes } }).select(
    "name",
  );
  res.json(users);
});

exports.comment = catchAsync(async (req, res) => {
  const { comment } = req.body;
  comment._id = uuidv4();
  comment.postedBy = req.body.userId;
  comment.text = req.body.comment.text;

  const result = await Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true },
  )
    .populate("comments.postedBy", "_id name photo")
    .populate("postedBy", "_id name photo")
    .exec();
  const userToNotifyId = result.postedBy._id;
  const commentId = comment._id;
  await newCommentNotification(
    req.body.userId,
    userToNotifyId,
    req.body.postId,
    commentId,
    comment.text,
  );
  res.json(result);
});

exports.uncomment = catchAsync(async (req, res) => {
  const { comment } = req.body;

  const post = await Post.findById(req.body.postId);

  const commentPostedBy = await Post.find(
    { comments: { $elemMatch: { _id: comment._id } } },
    { "comments.$": 1 },
  );

  // console.log(commentPostedBy[0].comments[0].postedBy);
  const commentPostedById = commentPostedBy[0].comments[0].postedBy;
  const userToNotifyId = post.postedBy;

  const result = await Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { comments: { _id: comment._id } } },
    { new: true },
  )
    .populate("comments.postedBy", "_id name photo")
    .populate("postedBy", "_id name photo")
    .exec();

  await removeCommentNotification(
    req.body.postId,
    comment._id,
    commentPostedById,
    userToNotifyId,
  );
  res.json(result);
});

exports.isPoster = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  const authorized = await (post &&
    req.user &&
    post.postedBy._id.toString() == req.user._id.toString());
  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
});
