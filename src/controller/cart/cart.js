const { v4: uuidV4 } = require("uuid");
const {
  add,
  getFromCart,
  getPyment,
  buyProduct,
  updateStatus,
} = require("../../model/cart/cart");
const { response } = require("../../helper/common");

const cartController = {
  addToCart: async (req, res, next) => {
    try {
      const { productId, customerId, quantity } = req.body;
      const result = await add({
        id: uuidV4(),
        productId,
        customerId,
        quantity,
      });
      response(res, result.rows, 200, "Add to cart success", "success");
    } catch (error) {
      next(error);
    }
  },
  getItemsFromCart: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await getFromCart(id);
      response(res, result.rows, 200, "Get success", "success");
    } catch (error) {
      next(error);
    }
  },
  getPaymentMethod: async (req, res, next) => {
    try {
      const result = await getPyment();
      response(res, result.rows, 200, "Get payment success", "success");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = cartController;
