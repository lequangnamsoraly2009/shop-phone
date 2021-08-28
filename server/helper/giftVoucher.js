
const GiftVoucher = ({ voucher }) => `
<div>
<table
  style="font-family:'Montserrat',sans-serif;"
  role="presentation"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  border="0"
>
  <tbody>
    <tr>
      <td
        style="overflow-wrap:break-word;word-break:break-word;padding:33px 10px 0px;font-family:'Montserrat',sans-serif;"
        align="left"
      >
        <div style="color: #00c399; line-height: 140%; text-align: center; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 140%;">
            <span style="font-size: 34px; line-height: 47.6px;">
              <strong>
                <span style="line-height: 47.6px; font-size: 34px;">
                  Magic Day
                </span>
              </strong>
            </span>
          </p>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<table
  style="font-family:'Montserrat',sans-serif;"
  role="presentation"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  border="0"
>
  <tbody>
    <tr>
      <td
        style="overflow-wrap:break-word;word-break:break-word;padding:11px 44px;font-family:'Montserrat',sans-serif;"
        align="left"
      >
        <div style="line-height: 190%; text-align: center; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 190%;">
            <strong>
              On this occasion it is a beautiful day and we feel you are
              living a very good life. So we decided to give you a gift as
              a token of our gratitude. Give you code ${voucher.voucherName} for a
              great day of shopping! The code will expire on ${new Date(voucher.expiryDate).toLocaleString("en-GB")}
            </strong>
          </p>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<table
  style="font-family:'Montserrat',sans-serif;"
  role="presentation"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  border="0"
>
  <tbody>
    <tr>
      <td
        style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:'Montserrat',sans-serif;"
        align="left"
      >
        <div align="center">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"
          >
            <tr>
              <td
                style="font-family:'Montserrat',sans-serif;"
                align="center"
              >
                <v:roundrect
                  xmlns:v="urn:schemas-microsoft-com:vml"
                  xmlns:w="urn:schemas-microsoft-com:office:word"
                  href=""
                  style="height:46px; v-text-anchor:middle; width:164px;"
                  arcsize="8.5%"
                  stroke="f"
                  fillcolor="#843fa1"
                >
                  <w:anchorlock />
                  <center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;">
                    <a
                      href=""
                      target="_blank"
                      style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #843fa1; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;"
                    >
                      <span style="display:block;padding:15px 35px;line-height:120%;">
                        <strong>
                          <span style="font-size: 14px; line-height: 16.8px;">
                            LOGIN NOW!
                          </span>
                        </strong>
                      </span>
                    </a>
                  </center>
                </v:roundrect>
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<table
  style="font-family:'Montserrat',sans-serif;"
  role="presentation"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  border="0"
>
  <tbody>
    <tr>
      <td
        style="overflow-wrap:break-word;word-break:break-word;padding:11px 44px 18px;font-family:'Montserrat',sans-serif;"
        align="left"
      >
        <div style="line-height: 190%; text-align: center; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 190%;">
            Thank you for support !
          </p>
        </div>
      </td>
    </tr>
  </tbody>
</table>
</div>
);
`;

module.exports = { GiftVoucher }
