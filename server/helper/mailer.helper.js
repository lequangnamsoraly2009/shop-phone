const nodemailer = require("nodemailer");
const {google} = require("googleapis")

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});

function sendMail(mailOptions) {
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
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        rej(err);
      } else {
        res(info);
      }
    });
  });
};

exports.sendConfirmationEmail = ({toUser, hash}) => {
  const mailOptions = {
    from: "Soraly Shop <no-reply@soralyshop.com>",
    to: toUser.email,
    subject: "Soraly Shop - Activate Account",
    html: `
              <h2>Hello ${toUser.userName}</h2>
              <p>Thank you for registering into our application. Just one more step...</p>
              <p>To activate your account please follow this link: <a target="_blank" href="${process.env.DOMAIN}/buyer/activated/${hash}">Activate Link</a></p>
              <p>Cheers</p>
              <p>Soraly Nè</p>
          `,
  };
  return sendMail(mailOptions)
}

exports.sendResetPasswordEmail = ({toUser, newPassword}) => {
  const mailOptions = {
    from: "Soraly Shop <no-reply@soralyshop.com>",
    to: toUser.email,
    subject: 'Soraly Shop - Reset Password',
    html: `
      <h3> Hello ${toUser.userName} </h3>
      <p>Tôi đéo hiểu tại sao bạn lại quên mật khẩu? Có mỗi cái mật khẩu mà bạn còn quên thì trên cuộc đời này còn thứ gì quan trọng để bạn nhớ nữa? Lần này tôi thương tôi mới cho bạn mật khẩu mới nhé!</p>
      <p>Mật khẩu mới của bạn đây nè: <i>${newPassword}</i></p>
      <p> Đăng nhập lại nhớ đổi lại mật khẩu đi !! 😡 </p>
      <p>Cách đổi mật khẩu cho bạn nếu bạn là <i>Tấm Chiếu Mới</i> đây: Biểu tượng User (cái mà có tên với cái hình chữ U ấy) -> Change Password</p>
      <p>Nhấn vào đây mà quay lại đăng nhập đi: <a target="_blank" href="${process.env.DOMAIN}/buyer/login">Login Now</a></p>
      <p>Cảm ơn và không hẹn gặp lại </p>
      <p>Soraly Argry 😡!</p>
    `
  };
  return sendMail(mailOptions);
}