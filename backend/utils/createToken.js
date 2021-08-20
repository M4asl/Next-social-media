const jwt = require("jsonwebtoken");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 3 * 24 * 60 * 60,
  });

  user.password = undefined;

  const {
    _id,
    name,
    email,
    created,
    about,
    photo,
    facebook,
    instagram,
    twitter,
    youtube,
  } = user;

  res.status(statusCode).json({
    _id,
    name,
    email,
    created,
    about,
    facebook,
    instagram,
    twitter,
    youtube,
    photo,
    token,
  });
};
