import mailgun from "mailgun-js";

// Import dotenv
import "dotenv/config";

const DOMAIN = process.env.MAILGUN_DOMAIN;
const API_KEY = process.env.MAILGUN_API_KEY;
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
const data = {
  from: "Admin <admin@cuanmax.id>",
  to: "iwanzurya2610@gmail.com",
  subject: "Hello",
  text: "Testing some Mailgun awesomness!",
};
mg.messages().send(data, function (error, body) {
  console.log(body);
});
