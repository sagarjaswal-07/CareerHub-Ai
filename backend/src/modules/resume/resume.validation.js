const { z } = require("zod");

const uploadResumeSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required"),
});

module.exports = {
  uploadResumeSchema,
};  