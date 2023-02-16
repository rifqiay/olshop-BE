const express = require("express");
const router = express.Router();
const {
  addNewAddress,
  primaryAddress,
} = require("../../controller/addres/address");

router.post("/", addNewAddress).put("/set-address", primaryAddress);

module.exports = router;
