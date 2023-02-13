const express = require("express");
const router = express.Router();
const authSeller = require("./auth/seller.routes");

router.use("/auth/seller", authSeller);

module.exports = router;
