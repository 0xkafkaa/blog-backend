const jwt = require("jsonwebtoken");
const { tryCatch } = require("../utils/tryCatch");

exports.authenticate = tryCatch(async function (req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next({
      message: "Unauthorized. Token not available",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decode);
    req.user = decode.user;
    next();
  } catch (error) {
    return next({
      message: "Unauthorized. Error while verifying",
    });
  }
});

exports.authorize = function (roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next({
        message: "Unauthorized to access this route",
      });
    }
    next();
  };
};
