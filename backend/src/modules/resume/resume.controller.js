const asyncHandler = require("../../utils/asyncHandler");
const resumeService = require("./resume.service");

const uploadResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.uploadResume(
    req.user._id,
    req.file,
    req.body.title,
  );

  res.status(201).json({
    success: true,
    message: "Resume uploaded successfully",
    data: resume,
  });
});

const getUserResumes = asyncHandler(async (req, res) => {
  const resumes = await resumeService.getUserResumes(req.user._id);

  res.status(200).json({
    success: true,
    message: "Resumes fetched successfully",
    data: resumes,
  });
});

const getResumeById = asyncHandler(async (req, res) => {
  const resume = await resumeService.getResumeById(
    req.params.resumeId,
    req.user._id,
  );

  res.status(200).json({
    success: true,
    message: "Resume fetched successfully",
    data: resume,
  });
});

const setDefaultResume = asyncHandler(async (req, res) => {
  const resume = await resumeService.setDefaultResume(
    req.params.resumeId,
    req.user._id,
  );

  res.status(200).json({
    success: true,
    message: "Default resume updated successfully",
    data: resume,
  });
});

const deleteResume = asyncHandler(async (req, res) => {
  await resumeService.deleteResume(req.params.resumeId, req.user._id);

  res.status(200).json({
    success: true,
    message: "Resume deleted successfully",
  });
});

module.exports = {
  uploadResume,
  getUserResumes,
  getResumeById,
  setDefaultResume,
  deleteResume,
};
