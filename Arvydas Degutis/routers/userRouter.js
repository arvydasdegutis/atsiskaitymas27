const express = require("express");
const { signup, login } = require("../controllers/authControler");
const validateNewUser = require("../validators/signup");
const validate = require("../validators/validate");
const validateLogin = require("../validators/login");
const userRouter = express.Router();

userRouter.route("/signup").post(validateNewUser, validate, signup);
userRouter.route("/login").post(validateLogin, validate, login);
module.exports = userRouter;