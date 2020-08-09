const express = require("express");
const User = require("../models/user");
const auth = require("../middlewares/auth");

const router = express.Router();

// Register new user
router.post("/users", async (req, res) => {
  let data = req.body;
  const dataKeys = Object.keys(req.body);
  const validterms = ["name", "email", "password"];

  dataKeys.forEach((key) => {
    if (!validterms.includes(key)) {
      delete data[key];
    }
  });
  const user = new User(data);
  try {
    await user.save();
    const token = await user.generateJWTtoken();
    res.json({ user: user.filterUserData(), token: token });
  } catch (error) {
    console.log("alaa");
    res.json(400, error);
  }
});

// Login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredintials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateJWTtoken();
    res.json({ user: user.name, token });
  } catch (error) {
    console.log("alaa", error);
    res.status(400).json({ error: error.toString() });
  }
});

// Logout
router.get("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    console.log("lolo");
    res.status(500).send("internal server error!");
  }
});

// List all Users for admin
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users.map((user) => user.filterUserData()));
  } catch (error) {
    res.status(500).send(error);
  }
});

//get my profile
router.get("/users/me", auth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).send();
    }
    res.json({ user: user.filterUserData() });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ["name", "email", "password"];

  const isValid = updates.every((key) => validUpdates.includes(key));
  if (!isValid) {
    res.status(400).send("Invalid Updates");
  }

  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
