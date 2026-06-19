const bcrypt = require("bcryptjs");

const User = require("./auth.model");
const ApiError = require("../../utils/ApiError");
const generateToken = require("../../utils/generateToken");

const registerUser = async ({
  name,
  email,
  password,
}) => {
  const existingUser =
    await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(
      409,
      "User already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async ({
  email,
  password,
}) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const isPasswordValid =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordValid) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const token = generateToken(
    user._id
  );

  return {
    user,
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};