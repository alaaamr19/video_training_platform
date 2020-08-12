const express = require("express");
const Course = require("../models/course");
const Category = require("../models/category");
const admin = require("../middlewares/admin");
const paginate = require("jw-paginate");

const router = express.Router();

// Add new course (admin only)
router.post("/courses", admin, async (req, res) => {
  const course = new Course(req.body);
  try {
    await course.save();
    const cats = req.body.categories;
    if (cats) {
      for (i = 0; i < cats.length; i++) {
        let cat = await Category.findById(cats[i]._id);
      }
    }

    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

// List all courses (all)
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find({}).populate("categories");
    const page = parseInt(req.query.page) || 1;
    const pager = paginate(courses.length, page);

    const coursesPage = courses.slice(pager.startIndex, pager.endIndex + 1);
    res.json({ pager, coursesPage });
  } catch (error) {
    res.send(500, error);
  }
});

// Get certain course's details (all)
router.get("/courses/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const course = await Course.findById(_id).populate("categories");
    if (!course) {
      res.status(404).send();
    }
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Edit certain course (admin only)
router.put("/courses/:id", admin, async (req, res) => {
  const _id = req.params.id;

  try {
    let course = await Course.updateOne({ _id: _id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      res.status(400).send();
    }

    res.json(course);
  } catch (error) {
    res.send(400, error);
  }
});

// Delete certain course (admin only)
router.delete("/courses/:id", admin, async (req, res) => {
  const _id = req.params.id;
  try {
    const course = await Course.deleteOne({ _id: _id });
    if (!course) {
      res.status(404).send();
    }
    res.send(course);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
