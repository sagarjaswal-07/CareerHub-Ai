const pdfParse = require("pdf-parse");
const ApiError = require("../../utils/ApiError");

const extractTextFromPdf = async (buffer) => {
  try {
    const data = await pdfParse(buffer);

    return data.text?.trim() || "";
  } catch (error) {
    throw new ApiError(500, "Failed to extract text from PDF");
  }
};

const extractEmail = (text) => {
  const emailMatch = text.match(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
  );

  return emailMatch ? emailMatch[0] : "";
};

const extractPhone = (text) => {
  const phoneMatch = text.match(
    /(\+91[\-\s]?)?[6-9]\d{9}|(\+\d{1,3}\s?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/,
  );

  return phoneMatch ? phoneMatch[0] : "";
};

const extractFullName = (text) => {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines[0] || "";
};

const extractSkills = (text) => {
  const commonSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Redux",
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose",
    "MySQL",
    "PostgreSQL",
    "HTML",
    "CSS",
    "Tailwind",
    "Bootstrap",
    "Git",
    "GitHub",
    "Docker",
    "AWS",
    "Firebase",
    "Socket.io",
    "REST API",
    "GraphQL",
    "Python",
    "Java",
    "C++",
    "C",
    "PHP",
    "Laravel",
    "NestJS",
    "Redux Toolkit",
    "Zustand",
    "JWT",
    "OAuth",
  ];

  const lowerText = text.toLowerCase();

  return commonSkills.filter((skill) =>
    lowerText.includes(skill.toLowerCase()),
  );
};

const extractEducation = (text) => {
  const educationRegex =
    /Education([\s\S]*?)(Experience|Skills|Projects|Certifications|Achievements|Interest|$)/i;

  const match = text.match(educationRegex);

  if (!match) {
    return [];
  }

  return match[1]
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
};

const extractExperience = (text) => {
  const experienceRegex =
    /Experience([\s\S]*?)(Education|Skills|Projects|Certifications|Achievements|Interest|$)/i;

  const match = text.match(experienceRegex);

  if (!match) {
    return [];
  }

  return match[1]
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseResume = (text) => {
  return {
    fullName: extractFullName(text),
    email: extractEmail(text),
    phone: extractPhone(text),
    skills: extractSkills(text),
    education: extractEducation(text),
    experience: extractExperience(text),
  };
};

module.exports = {
  extractTextFromPdf,
  parseResume,
};
