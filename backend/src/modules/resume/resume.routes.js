const express = require("express");
const router = express.Router();

const protect = require("../../middlewares/auth.middleware");
const upload = require("../../middlewares/upload/resumeUpload.middleware");
const resumeController = require("./resume.controller");

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  resumeController.uploadResume,
);

const cloudinary = require("../../config/cloudinary");

router.get("/upload-test", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "data:text/plain;base64,SGVsbG8gV29ybGQ=",
      {
        resource_type: "raw",
      }
    );

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("UPLOAD TEST ERROR:");
    console.dir(error, { depth: null });

    res.status(500).json({
      message: error.message,
      name: error.name,
      http_code: error.http_code,
    });
  }
});

module.exports = router;
