const express = require("express");
const { check } = require("express-validator");
const validator = require("../../middleware/validator");
const { register, verifyEmail } = require("../../controller/auth/seller");
const router = express.Router();

router
  .post(
    "/register",
    [
      check("name", "name is required").not().isEmpty(),
      check("email", "email is required").not().isEmpty(),
      check("phoneNumber", "phoneNumber is required").not().isEmpty(),
      check("storeName", "storeName is required").not().isEmpty(),
      check("password", "password is required").not().isEmpty(),
    ],
    validator,
    register
  )
  .get("/verify-email/:token", verifyEmail);

module.exports = router;
