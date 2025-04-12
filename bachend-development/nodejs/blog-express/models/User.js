const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

userSchema.statics.signup = async function (username, email, password) {
  if (!username || !email || !password)
    throw new AppError("All fields are required");

  const emailExist = await User.findOne({ email });
  if (emailExist) throw new AppError("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = User.create({ username, email, password: hashedPassword });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw new AppError("All fields are required", 400);

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError("invalid credentials", 400);

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new AppError("invalid credentials", 400);

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
