const createRateLimiter = require("./rateLimit.middleware");

const atsLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 5,
  message:
    "Too many ATS analysis requests. Please try again later.",
});

const jdMatchLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 5,
  message:
    "Too many JD match requests. Please try again later.",
});

module.exports = {
  atsLimiter,
  jdMatchLimiter,
};