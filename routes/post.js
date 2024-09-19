const express = require("express");
const { getPosts, getPost, createPost } = require("../controllers/post");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", authenticate, createPost);
module.exports = router;
