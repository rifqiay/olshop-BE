const db = require("../../config/db");

const getMany = () => {
  return db.query(`SELECT * FROM category`);
};

const getOne = (id) => {
  return db.query(`SELECT * FROM category WHERE id='${id}'`);
};

module.exports = { getMany, getOne };
