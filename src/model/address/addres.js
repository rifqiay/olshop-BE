const db = require("../../config/db");

const addAddress = (data) => {
  const {
    id,
    addressAs,
    recipientName,
    recipientPhoneNumber,
    fullAddress,
    city,
    poscode,
    customerId,
  } = data;
  return db.query(
    `INSERT INTO address( id, addressas, recipientname, recipientphonenumber, fulladdress, city, poscode, customerid ) VALUES( '${id}', '${addressAs}', '${recipientName}', '${recipientPhoneNumber}', '${fullAddress}', '${city}', '${poscode}', '${customerId}' )`
  );
};

const setPrimaryAddress = ({ customerId, addressId }) => {
  return db.query(
    `UPDATE customer SET addressid='${addressId}' WHERE id='${customerId}'`
  );
};

const getAllAddress = (customerId) => {
  return db.query(`SELECT * FROM address WHERE customerid='${customerId}'`);
};

const setNullPrimaryAddress = (customerId) => {
  return db.query(
    `UPDATE address SET primaryaddress=null WHERE customerid='${customerId}'`
  );
};

const setTruePrimaryAddress = (id) => {
  return db.query(`UPDATE address SET primaryaddress=true WHERE id='${id}'`);
};

const getPrimaryAddress = (customerId) => {
  return db.query(
    `SELECT * FROM address WHERE primaryaddress=true AND customerid='${customerId}'`
  );
};

module.exports = {
  addAddress,
  setPrimaryAddress,
  getAllAddress,
  setNullPrimaryAddress,
  setTruePrimaryAddress,
  getPrimaryAddress,
};
