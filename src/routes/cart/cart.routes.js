const express = require("express");
const {
  addToCart,
  getItemsFromCart,
  getPaymentMethod,
} = require("../../controller/cart/cart");
const router = express.Router();

router
  .post("/add", addToCart)
  .get("/payment", getPaymentMethod)
  .get("/:id", getItemsFromCart);

module.exports = router;
