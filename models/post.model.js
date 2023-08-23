const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dygolqxi7/image/upload/v1689775723/FindFurniture/demo_avtar_rwreos.jpg",
    },
  },
  text: { type: String },
  totalLikes: { type: Number, default: 0 },
  likedUsers: [{ type: String }],
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("postModel", postSchema);
