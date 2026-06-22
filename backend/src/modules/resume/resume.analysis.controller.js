const asyncHandler = require("../../utils/asyncHandler");
const analysisService = require("./resume.analysis.service");

const analyzeResume = asyncHandler(async (req, res) => {
  const result = await analysisService.analyzeResume(
    req.params.resumeId,
    req.user._id,
  );

  res.status(200).json({
    success: true,
    message: "ATS analysis completed successfully",
    data: result,
  });
});

module.exports = {
  analyzeResume,
};
