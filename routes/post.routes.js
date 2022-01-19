const router = require("express").Router();
const {
  readPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  editCommentPost,
  deleteCommentPost,
} = require("../controllers/post.controller");
const multer = require("multer");
const path = require("path");

//upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../client/public/uploads/posts/`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

router.get("/", readPost);
router.post("/", upload.single("file"), createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/like-post/:id", likePost);
router.patch("/unlike-post/:id", unlikePost);

router.patch("/comment-post/:id", commentPost);
router.patch("/edit-comment-post/:id", editCommentPost);
router.patch("/delete-comment-post/:id", deleteCommentPost);

module.exports = router;
