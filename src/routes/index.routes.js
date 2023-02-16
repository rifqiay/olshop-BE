const express = require("express");
const router = express.Router();
const authSeller = require("./seller/auth/seller.routes");
const authCustomer = require("./customer/auth/customer.routes");
const editSeller = require("./seller/edit.routes");
const editCustomer = require("./customer/edit.routes");
const categories = require("./categories/categories.routes");
const product = require("./product/product.routes");
const address = require("./address/address.routes");
const cart = require("./cart/cart.routes");

router
  .use("/auth/seller", authSeller)
  .use("/seller", editSeller)
  .use("/auth/customer", authCustomer)
  .use("/customer", editCustomer)
  .use("/categories", categories)
  .use("/product", product)
  .use("/address", address)
  .use("/cart", cart);

module.exports = router;
