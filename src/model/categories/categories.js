const db = require("../../config/db");

const getMany = () => {
  return db.query(`SELECT * FROM category`);
};

const getOne = (id) => {
  return db.query(`SELECT product.id as id_product, product.name, product.price, product.photo0, seller.storename, category.name as category
  FROM product
  JOIN seller ON product.sellerid = seller.id
  JOIN category ON product.categoryid = category.id
  WHERE categoryid='${id}'`);
};

module.exports = { getMany, getOne };
