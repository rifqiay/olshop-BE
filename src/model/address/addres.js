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

module.exports = {
  addAddress,
  setPrimaryAddress,
};
