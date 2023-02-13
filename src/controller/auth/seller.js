const bcrypt = require("bcryptjs");
const { v4: uuidV4 } = require("uuid");
const crypto = require("crypto");
const createError = require("http-errors");
const sendEmail = require("../../helper/sendEmail");
const { response } = require("../../helper/common");
const {
  findEmail,
  create,
  findToken,
  verifyingEmail,
} = require("../../model/auth/seller");

const authSeller = {
  register: async (req, res, next) => {
    try {
      const { name, email, phoneNumber, storeName, password } = req.body;
      const seller = await findEmail(email);
      if (seller.rowCount > 0)
        throw next(new createError(401, "Email already used!"));
      const passwordHash = bcrypt.hashSync(password);
      const isverified = false;
      const token = crypto.randomBytes(16).toString("hex");
      const data = {
        id: uuidV4(),
        name,
        email,
        phoneNumber,
        storeName,
        passwordHash,
        isverified,
        token,
      };
      sendEmail.sendConfirmationEmail(email, token);
      create(data)
        .then((result) => response(res, result.rows, 200, "Register succses"))
        .catch((error) => next(new createError(error)));
    } catch (error) {
      next(error);
    }
  },
  verifyEmail: async (req, res, next) => {
    try {
      const { token } = req.params;
      const checkIsverified = await findToken(token);
      if (checkIsverified.rowCount == 0)
        throw next(createError(500, "Verify token is invalid"));
      await verifyingEmail(token)
        .then(() => {
          res.send(`<center>
            <div>
              <h1>Activation Success</h1>
            </div>
            </center>`);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authSeller;
