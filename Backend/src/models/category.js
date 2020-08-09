const mongoose = require("mongoose");

const Category = mongoose.model("Category", {
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
module.exports = Category;
