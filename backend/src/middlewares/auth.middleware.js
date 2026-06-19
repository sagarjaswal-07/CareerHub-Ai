const jwt = require("jsonwebtoken");
const env = require("../config/env");

const User = require("../modules/auth/auth.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const decoded = jwt.verify(token, env.jwtSecret);

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;

  next();
});

module.exports = protect;
