import {
  signupMailer,
  forgotPasswordMailer,
} from "../../src/services/mailer.js";

const email = "iwan.suryaningrat28@gmail.com";
const token = "1234567890";

// test signup mailer
const signupMail = await signupMailer(email, token);
console.log(signupMail);

// test forgot password mailer
const forgotPasswordMail = await forgotPasswordMailer(email, token);
console.log(forgotPasswordMail);
