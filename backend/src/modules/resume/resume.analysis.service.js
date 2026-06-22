const Resume = require("./resume.model");
const ApiError = require("../../utils/ApiError");

const {
  generateContent,
  cleanJsonResponse,
} = require("../../services/gemini.service");

const {
  getATSAnalysisPrompt,
} = require("./prompts/atsAnalysis.prompt");

const analyzeResume = async (resumeId, userId) => {
  const resume = await Resume.findOne({
    _id: resumeId,
    userId,
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  // Prevent unnecessary Gemini calls
  if (resume.analysisStatus === "COMPLETED") {
    return resume;
  }

  resume.analysisStatus = "PROCESSING";
  await resume.save();

  try {
    const prompt = getATSAnalysisPrompt(
      resume.rawText
    );

    const aiResponse =
      await generateContent(prompt);

    const cleanedResponse =
      cleanJsonResponse(aiResponse);

    const analysis = JSON.parse(
      cleanedResponse
    );

    resume.analysis = {
      overallScore:
        analysis.overallScore || 0,

      atsScore:
        analysis.atsScore || 0,

      summary:
        analysis.summary || "",

      strengths:
        analysis.strengths || [],

      weaknesses:
        analysis.weaknesses || [],

      suggestions:
        analysis.suggestions || [],

      missingSkills:
        analysis.missingSkills || [],

      recommendedRoles:
        analysis.recommendedRoles || [],

      analyzedAt: new Date(),
    };

    resume.analysisStatus =
      "COMPLETED";

    await resume.save();

    return resume;
  } catch (error) {
    resume.analysisStatus = "FAILED";

    await resume.save();

    console.error(
      "Resume Analysis Error:",
      error
    );

    throw new ApiError(
      500,
      "Failed to analyze resume"
    );
  }
};

module.exports = {
  analyzeResume,
};