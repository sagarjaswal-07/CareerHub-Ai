const Resume = require("./resume.model");
const JobMatch = require("./jdMatch.model");

const ApiError = require("../../utils/ApiError");

const {
  generateContent,
  cleanJsonResponse,
} = require("../../services/gemini.service");

const { getJDMatchPrompt } = require("./prompts/jdMatch.prompt");

const analyzeJDMatch = async (userId, resumeId, jobDescription) => {
  const resume = await Resume.findOne({
    _id: resumeId,
    userId,
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  if (!resume.rawText) {
    throw new ApiError(400, "Resume text not available");
  }

  const prompt = getJDMatchPrompt(resume.rawText, jobDescription);

  try {
    const aiResponse = await generateContent(prompt);

    const cleanedResponse = cleanJsonResponse(aiResponse);

    const result = JSON.parse(cleanedResponse);

    const jobMatch = await JobMatch.create({
      userId,
      resumeId,

      jobDescription,

      matchScore: result.matchScore || 0,

      matchedSkills: result.matchedSkills || [],

      missingSkills: result.missingSkills || [],

      suggestions: result.suggestions || [],
    });

    return jobMatch;
  } catch (error) {
    console.error("JD Match Error:", error);

    throw new ApiError(500, "Failed to analyze job match");
  }
};

const getMatchHistory = async (userId) => {
  return JobMatch.find({ userId })
    .populate("resumeId", "title")
    .sort({ createdAt: -1 });
};

const getMatchById = async (matchId, userId) => {
  const match = await JobMatch.findOne({
    _id: matchId,
    userId,
  }).populate("resumeId", "title");

  if (!match) {
    throw new ApiError(404, "Match history not found");
  }

  return match;
};

module.exports = {
  analyzeJDMatch,
  getMatchHistory,
  getMatchById,
};
