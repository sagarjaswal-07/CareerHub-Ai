const asyncHandler = require(
  "../../utils/asyncHandler"
);

const resumeService = require(
  "./resume.service"
);

const uploadResume = async (req, res) => {
  try {
    console.log("Request received");
    console.log("File:", req.file);
    console.log("Body:", req.body);

    const resume = await resumeService.uploadResume(
      req.user.id,
      req.file,
      req.body.title
    );

    res.status(201).json(resume);
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
};
