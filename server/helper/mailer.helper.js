const nodemailer = require("nodemailer");

exports.sendConfirmationEmail = function ({ toUser, hash }) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "",
        clientId: "",
        clientSecret: "",
        refreshToken: "",
        accessToken: "",
      },
    });
    const mailOptions = {
      from: "Soraly Shop <no-reply@soralyshop.com>",
      to: toUser.email,
      subject: "Soraly Shop - Activate Account",
      html: `
                <h3>Hello ${toUser.userName}</h3>
                <p>Thank you for registering into our application. Just one more step...</p>
                <p>To activate your account please follow this link: <a target="_blank" href="${process.env.DOMAIN}/api/active/${hash}">Activate Link</a></p>
                <p>Cheers,</p>
                <p>Soraly Nè</p>
            `,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        rej(err);
      } else {
        res(info);
      }
    });
  });
};
