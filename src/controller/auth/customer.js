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
} = require("../../model/auth/customer");
const { generateToken, generateRefershToken } = require("../../helper/jwt");
const jwt = require("jsonwebtoken");

const authCustomer = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
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
        passwordHash,
        isverified,
        token,
      };
      sendEmail.sendConfirmationEmailCustomer(email, token);
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
        rows: [customer],
      } = await findEmail(email);
      if (!customer) throw next(new createError(400, "Email is invalid"));
      if (customer.isverified === false)
        throw next(new createError(400, "account not verified by email"));
      const isPassword = bcrypt.compareSync(password, customer.password);
      if (!isPassword) throw next(new createError(400, "Password is in valid"));
      delete customer.password;
      const payload = {
        id: customer.id,
      };
      customer.token = generateToken(payload);
      customer.refreshToken = generateRefershToken(payload);
      response(res, customer, 200, "login success");
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

module.exports = authCustomer;
