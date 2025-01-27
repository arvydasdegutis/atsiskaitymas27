const { body } = require("express-validator");
const { getUser } = require("../models/userModel");
const validateNewUser = [
  //check  if body not empty
  // body().notEmpty().withMessage('User body must contain data'),

  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username is too short(minimum: 3 symbols)")
    .custom(async (value) => {
      const user = await getUser(value);
      if (user) throw new Error("User already exists");
      return true;
    }),


  body("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 8 })
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 symbols, one lowercase, one uppercase, one number, one symbol"
    )
    .custom((value, { req }) => {
      if (value !== req.body.passwordconfirm) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

module.exports = validateNewUser;
