const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder: "careerhub/resumes",
          resource_type: "raw",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      );

    stream.end(buffer);
  });
};

const deleteFromCloudinary = async (
  publicId
) => {
  return cloudinary.uploader.destroy(
    publicId,
    {
      resource_type: "raw",
    }
  );
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
};