const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: err.statusCode || 500,
    message: err.message || "something went wrong",
    errors: [],
  });
});
