import React from "react";
import "./inforCheckout.css";

function CheckoutInfor({ informationPaymentPaypal }) {
  const { cart, feeShipValue, voucherValue } = informationPaymentPaypal;

  const totalPrice = cart.reduce((item1, item2) => {
    return (
      item1 +
      item2.price * item2.quantity -
      ((item2.price * item2.quantity * item2.sale) / 100).toFixed(2)
    );
  }, 0);

  return (
    <div className="checkout-wrapper">
      <div className="checkout-header">
        <h2>YOUR ORDER</h2>
      </div>
      <div className="checkout-content">
        <div className="checkout-price">
          {cart.map((item) => (
            <div key={item._id} className="checkout-col">
              <span style={{ textTransform: "capitalize" }}>
                {item.title}
                <span style={{ marginLeft: 30, color: "red", fontSize: 12 }}>
                  x{item.quantity}
                </span>
              </span>
              <span style={{ color: "rgb(25,144,255)" }}>
                {item.price * item.quantity -
                  (
                    (item.price * item.quantity * item.sale) / 100
                  ).toFixed(2)}{" "}
                $
              </span>
            </div>
          ))}
          <div className="checkout-col">
            <span>Fee Shipping: </span>
            <span>{feeShipValue} $</span>
          </div>
          <div className="checkout-col">
            <span>Voucher Gift:</span>
            <span>- {voucherValue} $</span>
          </div>
          <div className="checkout-col ">
            <span>Order Total:</span>
            <span style={{ color: "rgb(247,69,46)" }}>
              {Number(totalPrice) + Number(feeShipValue) - voucherValue} $
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutInfor;
