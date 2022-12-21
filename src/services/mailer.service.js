import mailgun from "mailgun-js";

// Import dotenv
import "dotenv/config";

// Verify Email Mailer
const signupMailer = async (email, token) => {
  const DOMAIN = process.env.MAILGUN_DOMAIN;
  const API_KEY = process.env.MAILGUN_API_KEY;
  const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
  const data = {
    from: "Admin <admin@cuanmax.id>",
    to: email,
    subject: "Email Verification",
    html: `
    <html>
    <head>
    <style>
    .container {
      width: 100%;
      height: 100%;
      background-color: orange;
      padding: 20px;
    }
    .card {
      width: 400px;
      height: 400px;
      background-color: white;
      margin: 0 auto;
      margin-top: 100px;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .card h1 {
      text-align: center;
      font-size: 30px;
      margin-bottom: 20px;
    }
    .card p {
      text-align: center;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .card a {
      text-decoration: none;
      background-color: #000;
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      display: block;
      width: 100px;
      text-align: center;
      margin: 0 auto;
    }
    </style>
    </head>
    <body>
    <div class="container">
    <div class="card">
    <h1>Verify Email</h1>
    <p>Click the button below to verify your email address.</p>
    <a href="http://cuanmax.vercel.app/activate-account/${token}">Verify</a>
    </div>
    </div>
    </body>
    </html>
    `,
  };

  const response = await mg
    .messages()
    .send(data)
    .then((body) => {
      return "Email sent";
    })
    .catch((error) => {
      return error.message;
    });

  return response;
};

// Forgot Password Mailer
const forgotPasswordMailer = async (email, token) => {
  const DOMAIN = process.env.MAILGUN_DOMAIN;
  const API_KEY = process.env.MAILGUN_API_KEY;
  const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
  const data = {
    from: "Admin <admin@cuanmax.id>",
    to: email,
    subject: "Reset Password",
    html: `
    <html>
    <head>
    <style>
    .container {
      width: 100%;
      height: 100%;
      background-color: orange;
      padding: 20px;
    }
    .card {
      width: 400px;
      height: 400px;
      background-color: white;
      margin: 0 auto;
      margin-top: 100px;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .card h1 {
      text-align: center;
      font-size: 30px;
      margin-bottom: 20px;
    }
    .card p {
      text-align: center;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .card a {
      text-decoration: none;
      background-color: #000;
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      display: block;
      width: 100px;
      text-align: center;
      margin: 0 auto;
    }
    </style>
    </head>
    <body>
    <div class="container">
    <div class="card">
    <h1>Reset Password</h1>
    <p>Click the button below to reset your password.</p>
    <a href="http://cuanmax.vercel.app/forgot-password/reset/${token}">Reset</a>
    </div>
    </div>
    </body>
    </html>
    `,
  };

  const response = await mg
    .messages()
    .send(data)
    .then((body) => {
      return "Email sent";
    })
    .catch((error) => {
      return error.message;
    });

  return response;
};

export { signupMailer, forgotPasswordMailer };
