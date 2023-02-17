const db = require("../../config/db");

const addOrder = (data) => {
  const { id, customerId } = data;
  return db.query(`INSERT INTO orders (id, customerId, totalPrice, products)
    VALUES (
      '${id}',
      '${customerId}',
      (SELECT SUM(cart.quantity * product.price) FROM cart JOIN product ON cart.productid = product.id WHERE cart.customerid = '${customerId}'),
      (SELECT json_agg(json_build_object('id', cart.productid, 'quantity', cart.quantity, 'name', product.name, 'price', product.price, 'photo', product.photo0)) FROM cart JOIN product ON cart.productid = product.id WHERE cart.customerid = '${customerId}')
    )`);
};

const delivery = ({ id, deliverystatus, orderid }) => {
  return db.query(
    `INSERT INTO delivery(id, deliverystatus, orderid) VALUES('${id}', '${deliverystatus}', '${orderid}')`
  );
};

const getBuyProducts = ({ customerId, deliverystatus }) => {
  return db.query(`SELECT orders.*, delivery.deliverystatus
    FROM orders 
    LEFT JOIN delivery ON orders.id = delivery.orderid
    
    WHERE customerid='${customerId}' AND delivery.deliverystatus='${deliverystatus}'`);
};

const getCartCustomer = (customerId) => {
  return db.query(`SELECT * FROM cart WHERE customerid='${customerId}'`);
};

const minusStock = ({ quantity, productid }) => {
  return db.query(
    `UPDATE product SET stock=stock - ${quantity} WHERE id='${productid}'`
  );
};

const deleteCart = (customerId) => {
  return db.query(`DELETE FROM cart WHERE customerid='${customerId}'`);
};

module.exports = {
  addOrder,
  delivery,
  getBuyProducts,
  getCartCustomer,
  minusStock,
  deleteCart,
};
