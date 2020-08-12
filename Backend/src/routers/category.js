const express = require("express");
const Category = require("../models/category");
const admin = require("../middlewares/admin");
const Course = require("../models/course");

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

router.get("/cats/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const category = await Category.findById(_id);

    if (!category) {
      res.status(404).send();
    }

    res.json(category);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get certain category's courses (all)
router.get("/categories/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const category = await Category.findById(_id);
    const courses = await Course.find({ categories: category }).populate(
      "categories"
    );
    if (!courses) {
      res.status(404).send();
    }

    res.json(courses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Edit certain category (admin only)
router.patch("/categories/:id", admin, async (req, res) => {
  const _id = req.params.id;

  try {
    let category = await Category.updateOne({ _id: _id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      res.status(400).send();
    }

    res.json(category);
  } catch (error) {
    res.send(400, error);
  }
});

// Delete certain categories (admin only)
router.delete("/categories/:id", admin, async (req, res) => {
  const _id = req.params.id;
  try {
    const category = await Category.deleteOne({ _id: _id });
    if (!category) {
      res.status(404).send();
    }
    res.send(category);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
