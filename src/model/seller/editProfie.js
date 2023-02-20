const db = require("../../config/db");

const edit = (data) => {
  const { id, email, phoneNumber, storeName, photo, storeDescription } = data;
  return db.query(
    `UPDATE seller SET email='${email}', phonenumber='${phoneNumber}', storename='${storeName}', photo='${photo}', storedescription='${storeDescription}' WHERE id='${id}'`
  );
};

const getProfile = (id) => {
  return db.query(`SELECT * FROM seller WHERE id='${id}'`);
};

module.exports = {
  edit,
  getProfile,
};
