const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/video-training", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// const courseSchema = mongoose.Schema({
//   name: {
//     type: String,
//     default: "",
//     trim: true,
//     required: true,
//   },
//   description: {
//     type: String,
//     trim: true,
//   },
//   points: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   categories: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//     },
//   ],
//   users: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],
// });

// const Course = mongoose.model("Course", courseSchema);
// // module.exports = Course;
