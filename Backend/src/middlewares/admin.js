const User = require("../models/user");
const getToken = require("../config/jwtConfig");

const admin = async (req, res, next) => {
  //   if (
  //     req.body.email == "admin@admin.com" &&
  //     request.body.password == "admin1234"
  //   ) {
  //     next();
  //   }
  try {
    const tokenObj = getToken(req);
    console.log(tokenObj);
    // console.log(decodedToken);
    const user = await User.findOne({
      _id: tokenObj.decodedtoken._id,
      "tokens.token": tokenObj.token,
      isAdmin: true,
    });
    if (!user) {
      throw new Error("Not Authenticated");
    }
    req.user = user;
    req.token = tokenObj.token;
    next();
  } catch (error) {
    console.log("alaaa", error);
    res.status(403).send("Not Authenticated");
  }
};

module.exports = admin;
