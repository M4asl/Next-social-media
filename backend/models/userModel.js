const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator(el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  created: {
    type: Date,
    default: Date.now,
  },
  about: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  following: [
    {
      type: Schema.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: Schema.ObjectId,
      ref: "User",
    },
  ],
  liked: [
    {
      type: Schema.ObjectId,
      ref: "Post",
    },
  ],
});

UserSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = model("User", UserSchema);
