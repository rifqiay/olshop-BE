const db = require("../../config/db");

const edit = (data) => {
  const { id, name, email, phoneNumber, gender, birth, photo } = data;
  return db.query(
    `UPDATE customer SET name='${name}', email='${email}', phonenumber='${phoneNumber}', gender='${gender}', birth='${birth}', photo='${photo}'  WHERE id='${id}'`
  );
};

const getProfile = (id) => {
  return db.query(`SELECT * FROM customer WHERE id='${id}'`);
};

module.exports = {
  edit,
  getProfile,
};
