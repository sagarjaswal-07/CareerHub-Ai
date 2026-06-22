const createRateLimiter = require("./rateLimit.middleware");

const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many authentication attempts. Please try again later.",
});

module.exports = authLimiter;