import mailgun from "mailgun-js";

const signupMailer = (email, token) => {
  const DOMAIN = process.env.MAILGUN_DOMAIN;
  const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });
  const data = {
    from: "No Reply <noreply@gmail.com>",
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
    <a href="http://localhost:3000/auth/activate/${token}">Verify</a>
    </div>
    </div>
    </body>
    </html>
    `,
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      return error.message;
    }

    return "Email sent";
  });
};

const forgotPasswordMailer = (email, token) => {
  const DOMAIN = process.env.MAILGUN_DOMAIN;
  const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });
  const data = {
    from: "No Reply <noreply@gmail.com>",
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
    <a href="http://localhost:3000/auth/reset-password/${token}">Reset</a>
    </div>
    </div>
    </body>
    </html>
    `,
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      return error.message;
    }

    return "Email sent";
  });
};

export { signupMailer, forgotPasswordMailer };
