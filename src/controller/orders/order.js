const { v4: uuidV4 } = require("uuid");
const { response } = require("../../helper/common");
const {
  addOrder,
  delivery,
  getBuyProducts,
  getCartCustomer,
  minusStock,
  deleteCart,
} = require("../../model/orders/orders");

const ordersController = {
  buys: async (req, res, next) => {
    try {
      const { customerId } = req.body;
      const cartResult = await getCartCustomer(customerId);
      const cartItems = cartResult.rows;

      for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        // kurangi jumlah produk pada tabel product
        await minusStock({
          quantity: cartItem.quantity,
          productid: cartItem.productid,
        });
      }
      const id = uuidV4();
      const data = {
        id,
        customerId,
      };
      const result = await addOrder(data);
      await delivery({
        id: uuidV4() + 1,
        deliverystatus: "pending",
        orderid: id,
      });

      // delete cart after order
      await deleteCart(customerId);
      response(res, result.rows, 200, "Order success", "success");
    } catch (error) {
      next(error);
    }
  },
  getOrders: async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const { deliverystatus } = req.query || "";
      console.log(deliverystatus);
      const result = await getBuyProducts({ customerId, deliverystatus });
      response(res, result.rows, 200, "Get orders success", "success");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ordersController;
