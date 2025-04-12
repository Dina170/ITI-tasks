const router = require("express").Router();
const User = require("../models/User");

router.post("/", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({
      username,
      email,
      password,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
