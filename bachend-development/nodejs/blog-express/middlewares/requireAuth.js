const User = require("../models/User");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new AppError("Authorization token required", 400);

  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email });
    if (!user) throw new AppError("Token is not valid", 400);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = requireAuth;
