const db = require("../../config/db");

const create = (data) => {
  const {
    id,
    name,
    email,
    phoneNumber,
    storeName,
    passwordHash,
    isverified,
    token,
  } = data;
  return db.query(
    `INSERT INTO seller(id, name, email, phonenumber, storename, password, isverified, token) VALUES('${id}', '${name}', '${email}', '${phoneNumber}', '${storeName}', '${passwordHash}', '${isverified}', '${token}')`
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM seller WHERE email='${email}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const findToken = (token) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM seller WHERE token='${token}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const verifyingEmail = (token) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE seller SET token= null, isverified=true WHERE token ='${token}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

module.exports = {
  create,
  findEmail,
  findToken,
  verifyingEmail,
};
