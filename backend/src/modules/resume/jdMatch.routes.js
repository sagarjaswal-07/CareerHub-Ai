const express = require("express");

const protect = require("../../middlewares/auth.middleware");

const { jdMatchLimiter } = require("../../middlewares/aiRateLimit.middleware");

const {
  analyzeMatch,
  getHistory,
  getMatchDetails,
} = require("./jdMatch.controller");

const router = express.Router();

router.post("/analyze", protect, jdMatchLimiter, analyzeMatch);

router.get("/history", protect, getHistory);

router.get("/:matchId", protect, getMatchDetails);

module.exports = router;
