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
const { generateToken, generateRefershToken } = require("../../helper/jwt");
const jwt = require("jsonwebtoken");

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
      const role = "seller";
      const data = {
        id: uuidV4(),
        name,
        email,
        phoneNumber,
        storeName,
        passwordHash,
        isverified,
        token,
        role,
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
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [seller],
      } = await findEmail(email);
      if (!seller) throw next(new createError(400, "Email is invalid"));
      if (seller.isverified === false)
        throw next(new createError(400, "account not verified by email"));
      const isPassword = bcrypt.compareSync(password, seller.password);
      if (!isPassword) throw next(new createError(400, "Password is in valid"));
      delete seller.password;
      const payload = {
        id: seller.id,
      };
      seller.token = generateToken(payload);
      seller.refreshToken = generateRefershToken(payload);
      response(res, seller, 200, "login success");
    } catch (error) {
      next(error);
    }
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      id: decoded.id,
    };
    const result = {
      token: generateToken(payload),
      refreshToken: generateRefershToken(payload),
    };
    res.send(result);
  },
};

module.exports = authSeller;
