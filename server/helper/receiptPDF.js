module.exports = ({ detailPayment }) => {
  const today = new Date();
  const totalBillProduct = detailPayment.cart.reduce((item1, item2) => {
    return (
      item1 +
      item2.price * item2.quantity -
      ((item2.price * item2.quantity * item2.sale) / 100).toFixed(2)
    );
  }, 0);

  const totalBill = detailPayment.cart.reduce((item1, item2) => {
    return (
      item1 +
      item2.price * item2.quantity -
      ((item2.price * item2.quantity * item2.sale) / 100).toFixed(2)
    );
  }, detailPayment.feeShipValue - detailPayment.voucherValue);

  return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title>Receipt Payment Of Soraly Shop</title>
    
            <style>
                .invoice-box {
                    max-width: 800px;
                    margin: auto;
                    padding: 30px;
                    border: 1px solid #eee;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                    font-size: 16px;
                    line-height: 24px;
                    font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                    color: #555;
                }
    
                .invoice-box table {
                    width: 100%;
                    line-height: inherit;
                    text-align: left;
                }
    
                .invoice-box table td {
                    padding: 5px;
                    vertical-align: top;
                }
    
                .invoice-box table tr td:nth-child(2) {
                    text-align: right;
                }
    
                .invoice-box table tr.top table td {
                    padding-bottom: 20px;
                }
    
                .invoice-box table tr.top table td.title {
                    font-size: 45px;
                    line-height: 45px;
                    color: #333;
                }
    
                .invoice-box table tr.information table td {
                    padding-bottom: 40px;
                }
    
                .invoice-box table tr.heading td {
                    background: #eee;
                    border-bottom: 1px solid #ddd;
                    font-weight: bold;
                }
    
                .invoice-box table tr.details td {
                    padding-bottom: 20px;
                }
    
                .invoice-box table tr.item td {
                    border-bottom: 1px solid #eee;
                }
    
                .invoice-box table tr.item.last td {
                    border-bottom: none;
                }
    
                .invoice-box table tr.total td:nth-child(2) {
                    border-top: 2px solid #eee;
                    font-weight: bold;
                }
    
                @media only screen and (max-width: 600px) {
                    .invoice-box table tr.top table td {
                        width: 100%;
                        display: block;
                        text-align: center;
                    }
    
                    .invoice-box table tr.information table td {
                        width: 100%;
                        display: block;
                        text-align: center;
                    }
                }
    
                /** RTL **/
                .invoice-box.rtl {
                    direction: rtl;
                    font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                }
    
                .invoice-box.rtl table {
                    text-align: right;
                }
    
                .invoice-box.rtl table tr td:nth-child(2) {
                    text-align: left;
                }
            </style>
        </head>
    
        <body>
            <div class="invoice-box">
                <table cellpadding="0" cellspacing="0">
                    <tr class="top">
                        <td colspan="2">
                            <table>
                                <tr>
                                    <td class="title">
                                        <img src="https://res.cloudinary.com/soralymusic/image/upload/v1630747915/Python/low-res-logo_uc7zv7.png" style="width: 100%; max-width: 300px" />
                                    </td>
    
                                    <td>
                                        Invoice: #${detailPayment._id}<br />
                                        Created: ${today.toLocaleString(
                                          "en-GB"
                                        )}<br />
                                        PurchaseDate: ${new Date(
                                          detailPayment.createdAt
                                        ).toLocaleString("en-GB")}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
    
                    <tr class="information">
                        <td colspan="2">
                            <table>
                                <tr>
                                    <td>
                                        ${detailPayment.address.ward}<br />
                                        ${detailPayment.address.district}<br />
                                        Tỉnh ${
                                          detailPayment.address.province
                                        }<br />
                                    </td>
    
                                    <td>
                                        ${detailPayment.name}<br />
                                        ${detailPayment.email}<br />
                                        ${detailPayment.phone}
                                    </td>
                                </tr>
                            </table>
                        </td>
                        
                    </tr>
    
                    <tr class="heading">
                        <td>Payment Method</td>
    
                        <td>${detailPayment.methodPayment}</td>
                    </tr>
    
                    <tr class="details">
                        <td>Fee Shipping</td>
                        <td>${detailPayment.feeShipValue} $</td>
                    </tr>
                    <tr class="details">
                        <td>Gift Voucher</td>
                        <td>${detailPayment.voucherValue} $</td>
                    </tr>

                    <tr class="details">
                         <td>
                                        Note Of Customer
                        </td>
                        <td>
                                        ${detailPayment.notes}
                        </td>
                    </tr>
    
                    <tr class="heading">
                        <td>Item</td>
    
                        <td>Price</td>
                    </tr>

                    <tr class="item">
                        <td>Total Price Products</td>
    
                        <td>${totalBillProduct} $</td>
                    </tr>
    
                    <tr class="total">
                        <td></td>
    
                        <td>Total Price: ${totalBill} $</td>
                    </tr>
                </table>
            </div>
        </body>
        <script>
        
        </script>
    </html>
    `;
};
