const authService = require("./auth.service");
const asyncHandler = require("../../utils/asyncHandler");
const generateToken = require("../../utils/generateToken");

const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,

    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },

    token,
  });
});

const login = asyncHandler(
  async (req, res) => {
    const { user, token } =
      await authService.loginUser(
        req.body
      );

    res.status(200).json({
      success: true,

      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  }
);

const getMe = asyncHandler(
  async (req, res) => {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  }
);

module.exports = {
  register,
  login,
  getMe,
};
