const { Schema, model } = require("mongoose");

const NotificationSchema = new Schema({
  type: {
    type: String,
    enum: ["newLike", "newComment", "newFollower"],
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  userToNotify: { type: Schema.Types.ObjectId, ref: "User" },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  commentId: { type: String },
  text: { type: String },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Notification", NotificationSchema);
