const express = require("express");
const router = express.Router();

const authController = require("./auth.controller");
const validate = require("../../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("./auth.validation");
const protect = require("../../middlewares/auth.middleware");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/me", protect, authController.getMe);

module.exports = router;
