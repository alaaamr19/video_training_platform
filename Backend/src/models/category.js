const mongoose = require("mongoose");

const CatShema = mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

// Instance method to add course to category
CatShema.methods.addCourse = async function (course) {
  const category = this;

  category.courses = [...category.courses, course];

  await category.save();
  return category;
};

const Category = mongoose.model("Category", CatShema);
module.exports = Category;
