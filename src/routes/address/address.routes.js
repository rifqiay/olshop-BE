const express = require("express");
const router = express.Router();
const {
  addNewAddress,
  primaryAddress,
  getAddressByIdCustomer,
  chosePrimaryAddress,
  getAddressPrimary,
} = require("../../controller/addres/address");

router
  .post("/", addNewAddress)
  .post("/chose-address", chosePrimaryAddress)
  .put("/set-address", primaryAddress)
  .get("/:customerId", getAddressByIdCustomer)
  .get("/primary/:customerId", getAddressPrimary);

module.exports = router;
