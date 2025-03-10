const User = require("../models/User");
const { tryCatch } = require("../utils/tryCatch");

exports.register = tryCatch(async function register(req, res) {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = user.getSignedJWT();

  res.status(201).json({
    success: true,
    user,
    token,
  });
});

exports.login = tryCatch(async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({
      message: "Please provide valid email and  password",
    });
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next({
      message: "Invalid Credentials",
    });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next({
      message: "Invalid Credentials. Wrong Password",
    });
  }

  const token = user.getSignedJWT();

  res.status(201).json({
    success: true,
    token,
  });
});

exports.getAllUsers = tryCatch(async function (req, res) {
  const users = await User.find();
  res.status(200).json({ users });
});
