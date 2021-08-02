const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  removeUser,
  uploadUserPhoto,
  resizeUserPhoto,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople,
} = require("../controllers/userController");
const {
  hasAuthorization,
  protect,
} = require("../controllers/authController");

const router = express.Router();

router.route("/api/users").get(protect, getAllUsers);

router
  .route("/api/users/findpeople/:userId")
  .get(protect, findPeople);

router
  .route("/api/users/follow")
  .put(protect, addFollowing, addFollower);

router
  .route("/api/users/unfollow")
  .put(protect, removeFollowing, removeFollower);

router
  .route("/api/users/:userId")
  .get(protect, getUser)
  .put(protect, uploadUserPhoto, resizeUserPhoto, updateUser)
  .delete(protect, hasAuthorization, removeUser);

module.exports = router;
