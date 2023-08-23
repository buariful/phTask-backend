const postModel = require("../models/post.model");
const cloudinaryConfig = require("../utils/cloudinary");

exports.getPosts = async (_req, res) => {
  const posts = await postModel.find({});
  res
    .status(200)
    .json({ success: true, totalResult: posts.length, data: posts });
};
exports.getSinglePost = async (req, res) => {
  const { postId } = req.params;
  const post = await postModel.findById(postId);
  res.status(200).json({ success: true, data: post });
};

exports.addNewPost = async (req, res) => {
  const { userName, userEmail, userPic, text } = req.body;
  const result = [];
  await Promise.all(
    req.files.map(async (file) => {
      const imgInfo = await cloudinaryConfig.uploader.upload(file.path, {
        folder: "phJobTask",
        quality: "auto",
      });

      result.push({
        url: imgInfo?.secure_url,
        public_id: imgInfo?.public_id,
      });
    })
  );
  const post = await postModel.create({
    user: {
      name: userName,
      email: userEmail,
      avatar:
        userPic ||
        "https://res.cloudinary.com/dygolqxi7/image/upload/v1689775723/FindFurniture/demo_avtar_rwreos.jpg",
    },
    text,
    images: result,
  });

  res.status(201).json({ success: true, post });
};
