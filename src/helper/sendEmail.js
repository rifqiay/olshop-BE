const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

module.exports = {
  sendConfirmationEmail: (email, confirmationCode) => {
    let mailOptions = {
      from: '"Verification" <your-email@gmail.com>',
      to: email,
      subject: "Verification Email",
      html: `<p>Please click the following link to verify your email address:</p><p><a href="${process.env.APP_URL}/api/v1/auth/seller/verify-email/${confirmationCode}">Verify</a></p>`,
    };

    transport.sendMail(mailOptions, (error, res) => {
      if (error) {
        return console.log(error);
      }
      console.log(res);
    });
  },
  sendConfirmationEmailCustomer: (email, confirmationCode) => {
    let mailOptions = {
      from: '"Verification" <your-email@gmail.com>',
      to: email,
      subject: "Verification Email",
      html: `<p>Please click the following link to verify your email address:</p><p><a href="${process.env.APP_URL}/api/v1/auth/customer/verify-email/${confirmationCode}">Verify</a></p>`,
    };

    transport.sendMail(mailOptions, (error, res) => {
      if (error) {
        return console.log(error);
      }
      console.log(res);
    });
  },
};
