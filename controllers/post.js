const Post = require("../models/Post");

exports.getPosts = async function (req, res) {
  const posts = await Post.find();
  res.status(200).json({ posts });
};

exports.getPost = async function (req, res) {
  const post = await Post.findById(req.params.id);
  res.status(200).json({ post });
};

exports.createPost = async function (req, res) {
  const user = req.user._id;
  const { postTitle, postBody, genre } = req.body;
  const post = await Post.create({ postTitle, postBody, genre, user });

  res.status(201).json({
    success: true,
    data: post,
  });
};
