const router = require("express").Router();
const Joi = require("joi");
const adminOnly = require("../middlewares/authRoles");
const requireAuth = require("../middlewares/requireAuth");
const Post = require("../models/Post");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const validate = require("../middlewares/validate");

const createPostSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  content: Joi.string().required().min(10).max(1000),
  tags: Joi.array().items(Joi.string()).default([]),
});

const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  content: Joi.string().min(10).max(1000),
  tags: Joi.array().items(Joi.string()),
}).min(1);

router.get("/", requireAuth, async (req, res, next) => {
  try {
    let query = Post.find();

    if (req.query.title) {
      query = query.where("title", new RegExp(req.query.title, "i"));
    }
    if (req.query.sort) {
      const sortFields = req.query.sort.split(",");
      const sortObj = {};

      sortFields.forEach((field) => {
        if (field.startsWith("-")) {
          sortObj[field.substring(1)] = -1;
        } else {
          sortObj[field] = 1;
        }
      });
      query = query.sort(sortObj);
    }
    if (req.query.limit && req.query.page) {
      const limit = parseInt(req.query.limit);
      const page = parseInt(req.query.page);
      query = query.skip((page - 1) * limit).limit(limit);
    }
    query = query.populate("author", "username");
    const posts = await query;
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  requireAuth,
  validate(createPostSchema),
  async (req, res, next) => {
    const { title, content, tags } = req.body;
    try {
      const post = new Post({
        title,
        content,
        author: req.user._id,
        tags,
      });

      await post.save();
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:id", requireAuth, adminOnly, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    if (!post.author.equals(req.user._id) && req.user.role !== "admin")
      throw new AppError("not authorized", 403);

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  requireAuth,
  validate(updatePostSchema),
  async (req, res, next) => {
    const { title, content, tags } = req.body;
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        throw new AppError("Post not found", 404);
      }
      if (!post.author.equals(req.user._id) && req.user.role !== "admin")
        throw new AppError("not authorized", 403);

      if (title) post.title = title;
      if (content) post.content = content;
      if (tags) post.tags = tags;

      await post.save();
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/:id/comments", requireAuth, async (req, res, next) => {
  const { text, author } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    const comment = {
      text,
      author,
      date: new Date(),
    };
    post.comments.push(comment);
    await post.save();
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});

router.get("/user/:userId", requireAuth, adminOnly, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new AppError("user not found", 404);
    }
    const posts = await Post.find({ author: req.params.userId }).populate(
      "author",
      "username"
    );
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
