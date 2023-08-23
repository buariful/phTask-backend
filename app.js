const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const postRouter = require("./router/post.router");

const app = express();
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(cors());
app.use("/api/v1", postRouter);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is ok",
  });
});

module.exports = app;
