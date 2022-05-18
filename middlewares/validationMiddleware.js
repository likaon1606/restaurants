const { body, validationResult } = require("express-validator");

//utils
const { AppError } = require("../utils/appErrors");

const createUserValidations = [
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("email").notEmpty().isEmail().withMessage("Must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least a 8 characters long"),
];

const createCommentValidation = [
  body("text").notEmpty().withMessage("Comment cannot empty"),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    const errorMsg = messages.join(". ");

    return next(new AppError(errorMsg, 400));
  }
  next();
};

module.exports = {
  createUserValidations,
  createCommentValidation,
  checkValidations,
};
