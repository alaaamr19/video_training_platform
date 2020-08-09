const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
