const express = require("express");
const router = express.Router();

const protect = require("../../middlewares/auth.middleware");
const upload = require("../../middlewares/upload/resumeUpload.middleware");

const resumeController = require("./resume.controller");

const analysisRoutes = require("./resume.analysis.routes");
const jdMatchRoutes = require("./jdMatch.routes");

// Upload Resume
router.post(
  "/upload",
  protect,
  upload.single("resume"),
  resumeController.uploadResume
);

// Get All User Resumes
router.get(
  "/",
  protect,
  resumeController.getUserResumes
);

// Get Resume By Id
router.get(
  "/:resumeId",
  protect,
  resumeController.getResumeById
);

// Set Default Resume
router.patch(
  "/:resumeId/default",
  protect,
  resumeController.setDefaultResume
);

// Delete Resume
router.delete(
  "/:resumeId",
  protect,
  resumeController.deleteResume
);

// Resume Analysis Routes
router.use(
  "/analysis",
  analysisRoutes
);

// JD Match Routes
router.use(
  "/jd-match",
  jdMatchRoutes
);

module.exports = router;