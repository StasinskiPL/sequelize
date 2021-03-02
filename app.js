const express = require("express");
const { sequelize, User, Post, Comment } = require("./models");
const user = require("./models/user");

const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const user = await User.create({ name, email, role });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
app.get("/users/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const users = await User.findOne({ where: { uuid }, include: "posts" });
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.delete("/users/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({ where: { uuid } });
    await user.destroy();
    return res.json({ message: "User deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.put("/users/:uuid", async (req, res) => {
  const { uuid } = req.params;
  const { name, email, role } = req.body;
  try {
    const user = await User.findOne({ where: { uuid } });
    user.name = name;
    user.email = email;
    user.role = role;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.post("/posts", async (req, res) => {
  const { userUuid, body } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    const post = await Post.create({ userId: user.id, body });
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: ["user"],
    });
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.post("/comments", async (req, res) => {
  const { body, userUuid, postUuid } = req.body;

  try {
    const post = await Post.findOne({ where: { uuid: postUuid } });
    const user = await User.findOne({ where: { uuid: userUuid } });
    const comment = await Comment.create({
      body,
      userId: user.id,
      postId: post.id,
    });
    return res.json(comment);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.findAll({ include: ["post", "user"] });
    return res.json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.listen({ port: 5000 }, async () => {
  console.log("server up on http://localhost:5000");
  await sequelize.authenticate();
  console.log("db connected");
});
