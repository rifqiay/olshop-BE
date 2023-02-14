const { getMany, getOne } = require("../../model/categories/categories");
const { response } = require("../../helper/common");
const createError = require("http-errors");

const categoryController = {
  getAll: (req, res, next) => {
    getMany()
      .then((result) => response(res, result.rows, 200, "Get all success"))
      .catch((error) => next(new createError(error)));
  },
  getById: (req, res, next) => {
    const id = req.params.id;
    getOne(id)
      .then((result) => response(res, result.rows, 200, "Get one success"))
      .catch((error) => next(new createError(error)));
  },
};

module.exports = categoryController;
