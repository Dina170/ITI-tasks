const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

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
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
