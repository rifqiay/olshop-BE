const express = require("express");
const {
  addProduct,
  getById,
  edit,
  newProduct,
  allProduct,
  remove,
} = require("../../controller/product/product");
const { upload } = require("../../middleware/upload");
const router = express.Router();

router
  .post("/", upload.array("photo", 6), addProduct)
  .get("/", allProduct)
  .get("/new", newProduct)
  .delete("/delete/:id", remove)
  .get("/:id", getById)
  .put("/edit/:id", upload.array("photo", 6), edit);

module.exports = router;
