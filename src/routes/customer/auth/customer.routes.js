const express = require("express");
const { check } = require("express-validator");
const validator = require("../../../middleware/validator");
const {
  register,
  verifyEmail,
  login,
  refreshToken,
} = require("../../../controller/auth/customer");
const router = express.Router();

router
  .post(
    "/register",
    [
      check("name", "name is required").not().isEmpty(),
      check("email", "email is required").not().isEmpty(),
      check("password", "password is required").not().isEmpty(),
    ],
    validator,
    register
  )
  .get("/verify-email/:token", verifyEmail)
  .post("/login", login)
  .post("/refresh-token", refreshToken);

module.exports = router;
