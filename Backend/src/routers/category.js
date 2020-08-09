const express = require("express");
const Category = require("../models/category");
const admin = require("../middlewares/admin");

const router = express.Router();

// Add new category(admin only)
router.post("/categories", admin, async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// List all categories (all)
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({});

    res.send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get certain category's courses (all)
router.get("/categories/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const category = await Category.findById(_id);
    await category.populate("courses");
    if (!category) {
      res.status(404).send();
    }
    res.send(category.courses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Edit certain category (admin only)
router.patch("/categories/:id", admin, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const validUpdates = ["name", "courses"];

  const isValid = updates.every((key) => validUpdates.includes(key));
  if (!isValid) {
    res.status(400).send("Invalid Updates");
  }

  try {
    const categories = await Category.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!categories) {
      res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    req.status(400).send(error);
  }
});

// Delete certain categories (admin only)
router.delete("/categories/:id", admin, async (req, res) => {
  const _id = req.params.id;
  try {
    const category = await Category.findByIdAndUpdate(_id);
    if (!category) {
      res.status(404).send();
    }
    res.send(category);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
