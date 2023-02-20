const express = require("express");
const { update, getSellerById } = require("../../controller/seller/seller");
const { upload } = require("../../middleware/upload");
const router = express.Router();

router
  .get("/:id", getSellerById)
  .put("/edit/:id", upload.single("photo"), update);

module.exports = router;
