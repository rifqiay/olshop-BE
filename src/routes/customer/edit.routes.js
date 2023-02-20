const express = require("express");
const {
  update,
  getCustomerById,
} = require("../../controller/customer/customer");
const { upload } = require("../../middleware/upload");
const router = express.Router();

router
  .put("/edit/:id", upload.single("photo"), update)
  .get("/:id", getCustomerById);

module.exports = router;
