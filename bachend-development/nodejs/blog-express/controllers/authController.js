const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function register(req, res, next) {
  const { username, email, password, role } = req.body;

  try {
    const user = await User.signup(username, email, password, role);

    res.status(201).json(email);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };
