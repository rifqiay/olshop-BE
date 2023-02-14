const express = require("express");
const { addProduct } = require("../../controller/product/product");
const { upload } = require("../../middleware/upload");
const router = express.Router();

router.post("/", upload.single("cover"), upload.array("photo", 5), addProduct);

module.exports = router;
