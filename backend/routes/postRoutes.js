const express = require("express");
const {
  listNewsFeed,
  listByUser,
  uploadPostPhoto,
  resizePostPhoto,
  createPost,
  removePost,
  isPoster,
  comment,
  uncomment,
  likePost,
  likedPost,
  unlikePost,
  unlikedPost,
  findLikesPost,
} = require("../controllers/postController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.route("/api/posts/feed").get(protect, listNewsFeed);

router.route("/api/posts/by/:userId").get(protect, listByUser);

router
  .route("/api/posts/new/:userId")
  .post(protect, uploadPostPhoto, resizePostPhoto, createPost);

router
  .route("/api/posts/:postId")
  .delete(protect, isPoster, removePost);

router.route("/api/posts/comment").put(protect, comment);
router.route("/api/posts/uncomment").put(protect, uncomment);

router.route("/api/posts/like").put(protect, likePost, likedPost);
router
  .route("/api/posts/unlike")
  .put(protect, unlikePost, unlikedPost);

router.route("/api/posts/likes/:postId").get(protect, findLikesPost);

module.exports = router;
