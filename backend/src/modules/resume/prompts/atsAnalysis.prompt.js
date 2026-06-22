const getATSAnalysisPrompt = (resumeText) => {
  return `
You are an expert ATS Resume Analyzer.

Analyze the following resume and return ONLY valid JSON.

Return response in this format:

{
  "overallScore": 0,
  "atsScore": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "missingSkills": [],
  "recommendedRoles": []
}

Rules:
- overallScore should be between 0 and 100
- atsScore should be between 0 and 100
- summary should be 2-3 lines
- Return only JSON
- Do not include markdown
- Do not include explanations outside JSON

Resume:

${resumeText}
`;
};

module.exports = {
  getATSAnalysisPrompt,
};
