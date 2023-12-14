const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
// AUTHENTICATION
const restricted = (req, res, next) => {
  //extract the token from the request
  const token = req.headers.authorization;
  token
    ? jwt.verify(token, JWT_SECRET, (err, decoded) => {
        err
          ? next({ status: 401, message: "token invalid" })
          : (req.decodedJwt = decoded),
          console.log(req.decodedJwt),
          next();
      })
    : next({ status: 401, message: "token required" });
};

// AUTHORIZATION
const checkRole = (req, res, next) => {
  next();
};

module.exports = {
  restricted,
  checkRole,
};
