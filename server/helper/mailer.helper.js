const nodemailer = require("nodemailer");
const {google} = require("googleapis")

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});

exports.sendConfirmationEmail = function ({ toUser, hash }) {
  return new Promise((res, rej) => {
    const accessToken = oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "lequangnam1617@gmail.com",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
    const mailOptions = {
      from: "Soraly Shop <no-reply@soralyshop.com>",
      to: toUser.email,
      subject: "Soraly Shop - Activate Account",
      html: `
                <h3>Hello ${toUser.userName}</h3>
                <p>Thank you for registering into our application. Just one more step...</p>
                <p>To activate your account please follow this link: <a target="_blank" href="${process.env.DOMAIN}/buyer/activated/${hash}">Activate Link</a></p>
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
