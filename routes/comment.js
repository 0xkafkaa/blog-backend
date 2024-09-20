const express = require("express");
const {
  getComments,
  addComment,
  getComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.get("/", getComments);
router.get("/:id", getComment);
router.post("/", authenticate, addComment);
router.put("/:id", authenticate, updateComment);
router.delete("/:id", authenticate, deleteComment);
module.exports = router;
