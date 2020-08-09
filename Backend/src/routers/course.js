const express = require("express");
const Course = require("../models/course");
const admin = require("../middlewares/admin");

const router = express.Router();

// Add new course (admin only)
router.post("/courses", admin, async (req, res) => {
  const course = new Course(req.body);
  try {
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

// List all courses (all)
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find({});

    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get certain course's details (all)
router.get("/courses/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const course = await Course.findById(_id);
    if (!course) {
      res.status(404).send();
    }
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Edit certain course (admin only)
router.patch("/courses/:id", admin, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const validUpdates = ["name", "description", "points"];

  const isValid = updates.every((key) => validUpdates.includes(key));
  if (!isValid) {
    res.status(400).send("Invalid Updates");
  }

  try {
    const course = await Course.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    req.status(400).send(error);
  }
});

// Delete certain course (admin only)
router.delete("/courses/:id", admin, async (req, res) => {
  const _id = req.params.id;
  try {
    const course = await Course.findByIdAndUpdate(_id);
    if (!course) {
      res.status(404).send();
    }
    res.send(course);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
