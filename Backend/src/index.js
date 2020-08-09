const express = require("express");
const cors = require("cors");
require("./db/mongodb");
const userRouter = require("./routers/user");
const courseRouter = require("./routers/course");
const categoryRouter = require("./routers/category");
const User = require("./models/user");

const app = express();
const port = process.env.port || 3000;

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(express.json());
app.use(categoryRouter);
app.use(userRouter);
app.use(courseRouter);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

const addSuperUser = async () => {
  const user = await User.findOne({ email: "admin@admin.com" });
  // console.log(user);
  if (!user) {
    const admin = new User({
      name: "admin",
      email: "admin@admin.com",
      password: "admin1234",
      isAdmin: true,
    });
    try {
      await admin.save();
      await admin.generateJWTtoken();
    } catch (error) {
      console.log("error", error);
    }
  }
};

addSuperUser();
