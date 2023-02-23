const db = require("../../config/db");

const createProduct = (data) => {
  const {
    id,
    name,
    price,
    stock,
    color,
    size,
    condition,
    description,
    photo0,
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    sellerId,
    categoryId,
  } = data;
  return db.query(
    `INSERT INTO product( id, name, price, stock, color, size, condition, description, photo0, photo1, photo2, photo3, photo4, photo5, sellerid, categoryid) VALUES( '${id}', '${name}', ${price}, ${stock}, '${color}', '${size}', '${condition}', '${description}', '${photo0}', '${photo1}', '${photo2}', '${photo3}', '${photo4}', '${photo5}', '${sellerId}', '${categoryId}')`
  );
};

const getOne = (id) => {
  return db.query(`SELECT product.*, seller.storeName 
  FROM product 
  LEFT JOIN seller ON product.sellerid = seller.id 
  WHERE product.id='${id}'`);
};

const update = (data) => {
  const {
    name,
    price,
    stock,
    color,
    size,
    condition,
    description,
    photo0,
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    categoryId,
    id,
  } = data;
  return db.query(
    `UPDATE product SET name='${name}', price=${price}, stock=${stock}, color='${color}', size='${size}', condition='${condition}', description='${description}', photo0='${photo0}', photo1='${photo1}', photo2='${photo2}', photo3='${photo3}', photo4='${photo4}', photo5='${photo5}', categoryid='${categoryId}' WHERE  id='${id}'`
  );
};

const getNewProduct = ({ limit, offset }) => {
  return db.query(`SELECT product.id as id_product, product.name, product.price, product.photo0, seller.storename
  FROM product
  JOIN seller ON product.sellerid = seller.id
  ORDER BY product.createat DESC
  LIMIT ${limit} OFFSET ${offset}`);
};

const getAllProduct = ({ search, sort, orderBy, limit, offset }) => {
  return db.query(`SELECT product.id as id_product, product.name, product.price, product.photo0, seller.storename
  FROM product
  JOIN seller ON product.sellerid = seller.id
  WHERE product.name ILIKE '%${search}%'
  ORDER BY product.${orderBy} ${sort}
  LIMIT ${limit} OFFSET ${offset}`);
};

const destroy = (id) => {
  return db.query(`DELETE FROM product WHERE id='${id}'`);
};

const countData = (search) => {
  return db.query(
    `SELECT COUNT(*) FROM product WHERE name ILIKE '%${search}%'`
  );
};

const getByIdSeller = ({ sellerId, search }) => {
  return db.query(
    ` SELECT * FROM product WHERE sellerid='${sellerId}' OR name ILIKE '%${search}%'`
  );
};

const getByCategoryId = (id) => {
  return db.query(`SELECT * FROM product WHERE categoryid='${id}'`);
};

module.exports = {
  createProduct,
  getOne,
  update,
  getNewProduct,
  getAllProduct,
  destroy,
  countData,
  getByIdSeller,
  getByCategoryId,
};
