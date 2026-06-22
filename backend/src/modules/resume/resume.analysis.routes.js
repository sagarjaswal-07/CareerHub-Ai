const express = require("express");

const protect = require("../../middlewares/auth.middleware");

const { atsLimiter } = require("../../middlewares/aiRateLimit.middleware");

const { analyzeResume } = require("./resume.analysis.controller");

const router = express.Router();

router.post("/:resumeId/analyze", protect, atsLimiter, analyzeResume);

module.exports = router;
