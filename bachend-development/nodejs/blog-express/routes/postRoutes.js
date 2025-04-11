const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.get("/", async (req, res) => {
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
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { title, content, author, tags } = req.body;
  try {
    const post = new Post({
      title,
      content,
      author,
      tags,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (tags) post.tags = tags;

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id/comments", async (req, res) => {
  const { text, author } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
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
    res.status(500).json({ message: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const posts = await Post.find({ author: req.params.userId }).populate(
      "author",
      "username"
    );
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
