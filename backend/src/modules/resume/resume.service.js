const Resume = require("./resume.model");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");

const uploadResume = async (userId, file, title) => {
  const result = await uploadToCloudinary(file.buffer);

  const resume = await Resume.create({
    userId,
    title,
    fileName: file.originalname,
    fileUrl: result.secure_url,
    publicId: result.public_id,
    fileSize: file.size,
    mimeType: file.mimetype,
  });

  return resume;
};

module.exports = {
  uploadResume,
};
