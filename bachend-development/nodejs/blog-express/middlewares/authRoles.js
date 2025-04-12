const AppError = require("../utils/AppError");

async function adminOnly(req, res, next) {
  const role = req.user.role;

  if (role != "admin") throw new AppError("access denied");

  next();
}

module.exports = adminOnly;
