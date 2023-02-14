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
    sellerId,
    categoryId,
  } = data;
  return db.query(
    `INSERT INTO product( id, name, price, stock, color, size, condition, description, sellerid, categoryid ) VALUES( '${id}', '${name}', ${price}, ${stock}, '${color}', '${size}', '${condition}', '${description}', '${sellerId}', '${categoryId}' )`
  );
};

const addPhoto = (data) => {
  const { id, cover, photo1, photo2, photo3, photo4, photo5, productId } = data;
  return db.query(
    `INSERT INTO photo( id, cover, photo1, photo2, photo3, photo4, photo5, productid ) VALUES( '${id}', '${cover}', '${photo1}', '${photo2}', '${photo3}', '${photo4}', '${photo5}', '${productId}' )`
  );
};

module.exports = {
  createProduct,
  addPhoto,
};
