const asyncHandler = require("../../utils/asyncHandler");

const {
  analyzeJDMatch,
  getMatchHistory,
  getMatchById,
} = require("./jdMatch.service");

const analyzeMatch = asyncHandler(async (req, res) => {
  const { resumeId, jobDescription } = req.body;

  const result = await analyzeJDMatch(req.user._id, resumeId, jobDescription);

  res.status(200).json({
    success: true,
    message: "JD match analysis completed successfully",
    data: result,
  });
});

const getHistory = asyncHandler(async (req, res) => {
  const history = await getMatchHistory(req.user._id);

  res.status(200).json({
    success: true,
    message: "Match history fetched successfully",
    data: history,
  });
});

const getMatchDetails = asyncHandler(async (req, res) => {
  const match = await getMatchById(req.params.matchId, req.user._id);

  res.status(200).json({
    success: true,
    message: "Match details fetched successfully",
    data: match,
  });
});

module.exports = {
  analyzeMatch,
  getHistory,
  getMatchDetails,
};
