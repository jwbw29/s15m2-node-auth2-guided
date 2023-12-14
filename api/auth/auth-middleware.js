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
          console.log(decoded),
          next();
      })
    : next({ status: 401, message: "token required" });
};

// AUTHORIZATION
const checkRole = (role) => (req, res, next) => {
  req.decodedJwt && req.decodedJwt.role === role // this is where we would check the role
    ? next()
    : next({ status: 403, message: "you are not authorized" });
};

module.exports = {
  restricted,
  checkRole,
};
