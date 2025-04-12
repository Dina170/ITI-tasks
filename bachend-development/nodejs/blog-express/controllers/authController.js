const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function register(req, res, next) {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);
    //const token = jwt.sign({email}, process.env.JWT_SECRET);

    res.status(201).json({ email: user.email });
  } catch (error) {
    next(error);
  }
}

module.exports = { register };
