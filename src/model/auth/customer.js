const db = require("../../config/db");

const create = (data) => {
  const { id, name, email, passwordHash, isverified, token } = data;
  return db.query(
    `INSERT INTO customer(id, name, email, password, isverified, token) VALUES('${id}', '${name}', '${email}', '${passwordHash}', '${isverified}', '${token}')`
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM customer WHERE email='${email}'`,
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

const findToken = (token) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM customer WHERE token='${token}'`,
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

const verifyingEmail = (token) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE customer SET token= null, isverified=true WHERE token ='${token}'`,
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
