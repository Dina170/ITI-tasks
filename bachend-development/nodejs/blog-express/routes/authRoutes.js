const { register, login } = require("../controllers/authController");

const router = require("express").Router();
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const validate = require("../middlewares/validate");

const complexityOptions = {
  min: 10,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: passwordComplexity(complexityOptions),
  username: Joi.string().min(3).max(30).required(),
  role: Joi.string().valid("user", "admin").optional(),
});

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
