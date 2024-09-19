const Post = require("../models/Post");
const { tryCatch } = require("../utils/tryCatch");

exports.getPosts = tryCatch(async function (req, res) {
  const posts = await Post.find();
  res.status(200).json({ posts });
});

exports.getPost = tryCatch(async function (req, res) {
  const post = await Post.findById(req.params.id);
  res.status(200).json({ post });
});

exports.createPost = tryCatch(async function (req, res) {
  const user = req.user._id;
  const { postTitle, postBody, genre } = req.body;
  const post = await Post.create({ postTitle, postBody, genre, user });

  res.status(201).json({
    success: true,
    data: post,
  });
});

exports.updatePost = tryCatch(async function (req, res, next) {
  let post = await Post.findById(req.params.id);
  if (!post) {
    return next({
      message: "Post not found",
    });
  }
  if (post.user.toString() !== req.user._id) {
    return next({
      message: "Not authorized to update this post",
    });
  }
  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: post,
  });
});

exports.deletePost = tryCatch(async function (req, res, next) {
  let post = await Post.findById(req.params.id);
  if (!post) {
    return next({
      message: "Post not found",
    });
  }
  if (post.user.toString() !== req.user._id) {
    return next({
      message: "Not authorized to delete this post",
    });
  }

  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});
