const getJDMatchPrompt = (
  resumeText,
  jobDescription
) => {
  return `
You are an expert technical recruiter and ATS system.

Compare the candidate resume with the given job description.

Return ONLY valid JSON.

Response format:

{
  "matchScore": 0,
  "matchedSkills": [],
  "missingSkills": [],
  "suggestions": []
}

Rules:
- matchScore must be between 0 and 100
- matchedSkills should contain skills found in both resume and job description
- missingSkills should contain important skills missing from the resume
- suggestions should contain actionable recommendations
- Return only JSON
- Do not use markdown
- Do not add explanations outside JSON

Resume:

${resumeText}

Job Description:

${jobDescription}
`;
};

module.exports = {
  getJDMatchPrompt,
};