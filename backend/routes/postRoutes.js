const express = require("express");
const {
  listNewsFeed,
  listByUser,
  uploadPostPhoto,
  resizePostPhoto,
  createPost,
  removePost,
} = require("../controllers/postController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.route("/api/posts/feed/:userId").get(protect, listNewsFeed);

router.route("/api/posts/by/:userId").get(protect, listByUser);

router
  .route("/api/posts/new/:userId")
  .post(protect, uploadPostPhoto, resizePostPhoto, createPost);

router.route("/api/posts/:postId").delete(protect, removePost);

module.exports = router;
