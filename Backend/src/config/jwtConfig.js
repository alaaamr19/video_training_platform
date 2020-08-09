const jwt = require("jsonwebtoken");

const getToken = (req) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  //   console.log(jwt.verify(token, "videoTraining"));
  return { token: token, decodedtoken: jwt.verify(token, "videoTraining") };
};
module.exports = getToken;
