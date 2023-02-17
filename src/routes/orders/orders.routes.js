const express = require("express");
const { buys, getOrders } = require("../../controller/orders/order");
const router = express.Router();

router.post("/", buys).get("/:customerId", getOrders);

module.exports = router;
