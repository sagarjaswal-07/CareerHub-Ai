const Resume = require("./resume.model");

const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../../utils/uploadToCloudinary");

const {
  extractTextFromPdf,
  parseResume,
} = require("./parser.service");

const ApiError = require("../../utils/ApiError");

const uploadResume = async (
  userId,
  file,
  title
) => {
  if (!file) {
    throw new ApiError(
      400,
      "Resume file is required"
    );
  }

  const rawText =
    await extractTextFromPdf(
      file.buffer
    );

  const parsedData =
    parseResume(rawText);

  const result =
    await uploadToCloudinary(
      file.buffer
    );

  const resume =
    await Resume.create({
      userId,
      title,
      fileName:
        file.originalname,
      fileUrl:
        result.secure_url,
      publicId:
        result.public_id,
      fileSize: file.size,
      mimeType:
        file.mimetype,

      rawText,
      parsedData,
    });

  return resume;
};

const getUserResumes = async (
  userId
) => {
  return Resume.find({
    userId,
  }).sort({
    createdAt: -1,
  });
};

const getResumeById = async (
  resumeId,
  userId
) => {
  const resume =
    await Resume.findOne({
      _id: resumeId,
      userId,
    });

  if (!resume) {
    throw new ApiError(
      404,
      "Resume not found"
    );
  }

  return resume;
};

const setDefaultResume = async (
  resumeId,
  userId
) => {
  await Resume.updateMany(
    { userId },
    { isDefault: false }
  );

  const resume =
    await Resume.findOneAndUpdate(
      {
        _id: resumeId,
        userId,
      },
      {
        isDefault: true,
      },
      {
        new: true,
      }
    );

  if (!resume) {
    throw new ApiError(
      404,
      "Resume not found"
    );
  }

  return resume;
};

const deleteResume = async (
  resumeId,
  userId
) => {
  const resume =
    await Resume.findOne({
      _id: resumeId,
      userId,
    });

  if (!resume) {
    throw new ApiError(
      404,
      "Resume not found"
    );
  }

  await deleteFromCloudinary(
    resume.publicId
  );

  await resume.deleteOne();

  return {
    message:
      "Resume deleted successfully",
  };
};

module.exports = {
  uploadResume,
  getUserResumes,
  getResumeById,
  setDefaultResume,
  deleteResume,
};