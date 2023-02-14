const express = require("express");
const { update } = require("../../controller/seller/seller");
const { upload } = require("../../middleware/upload");
const router = express.Router();

router.put("/edit/:id", upload.single("photo"), update);

module.exports = router;
