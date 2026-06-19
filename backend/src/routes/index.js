const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");
const resumeRoutes = require("../modules/resume/resume.routes");

router.use("/auth", authRoutes);
router.use("/resumes", resumeRoutes);

module.exports = router;
