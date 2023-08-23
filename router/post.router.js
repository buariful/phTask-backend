const {
  getPosts,
  addNewPost,
  getSinglePost,
} = require("../controllers/post.controller");
const upload = require("../middleware/multer");

const router = require("express").Router();

router.route("/post/all").get(getPosts);
router.route("/post/:postId").get(getSinglePost);
router.route("/post/new").post(upload.array("images", 10), addNewPost);

module.exports = router;
