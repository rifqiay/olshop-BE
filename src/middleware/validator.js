const { validationResult } = require("express-validator");
const createError = require("http-errors");

const validator = (req, res, next) => {
  const errors = validationResult(req).array();
  if (errors) {
    for (const error of errors) {
      next(new createError(422, error.msg));
    }
  }
  next();
};

module.exports = validator;
