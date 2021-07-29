const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const PostSchema = new Schema({
  text: {
    type: String,
    required: [true, "Text is required."],
  },
  photo: {
    type: String,
  },
  likes: [
    {
      type: Schema.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: Schema.ObjectId, ref: "User" },
    },
  ],
  postedBy: {
    type: Schema.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

global.PostSchema =
  global.PostSchema || mongoose.model("Post", PostSchema);
module.exports = global.PostSchema;
