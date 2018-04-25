const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "62bb235575587e",
    pass: "f2ded6a273336d"
  }
});

