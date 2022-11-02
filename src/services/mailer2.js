import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.cuanmax.id",
  port: 456,
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
    user: "test@cuanmax.id",
    pass: "C!xO@q8F%wL^",
  },
  tls: {
    // rejectUnAuthorized: true,
    rejectUnAuthorized: false,
  },
});

const mailOptions = {
  from: "test@cuanmax.id",
  to: "iwan.suryaningrat28@gmail.com",
  subject: "Sending Email using Nodejs",
  text: "That was easy!",
};

transporter
  .sendMail(mailOptions)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
