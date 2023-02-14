const express = require("express");
const { getAll, getById } = require("../../controller/categories/categories");
const router = express.Router();

router.get("/", getAll).get("/:id", getById);

module.exports = router;
