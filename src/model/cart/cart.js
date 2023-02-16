const db = require("../../config/db");

const add = ({ id, productId, customerId, quantity }) => {
  return db.query(
    `INSERT INTO cart( id, productid, customerid, quantity ) VALUES( '${id}', '${productId}', '${customerId}', ${quantity} )`
  );
};

const getFromCart = (id) => {
  return db.query(`SELECT cart.id as cart_id, cart.quantity as total_quantity, product.name as product_name, customer.id as customer_id, address.fulladdress as customer_address, SUM(cart.quantity * product.price) AS total_price
  FROM cart
  LEFT JOIN product ON cart.productid = product.id
  LEFT JOIN customer ON cart.customerid = customer.id
  LEFT JOIN address ON customer.addressid = address.id
  WHERE customer.id ='${id}'
  GROUP BY cart.id, product.name, customer.id, address.id`);
};

const getPyment = () => {
  return db.query(`SELECT * FROM payment`);
};

module.exports = {
  add,
  getFromCart,
  getPyment,
};
