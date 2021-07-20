import React from "react";
import "./inforCheckout.css";

function CheckoutInfor() {
  return (
    <div className="checkout-wrapper">
      <div className="checkout-header">
        <h2>YOUR ORDER</h2>
      </div>
      <div className="checkout-content">
        <div className="checkout-price">
          <div className="checkout-col  ">
            {
              <>
                <span>Totals Price:</span>
                <span style={{ color: "rgb(25,144,255)" }}>100 $</span>
              </>
            }
          </div>
          <div className="checkout-col">
            <span>Shipping COD:</span>
            <span>10 $</span>
          </div>
          <div className="checkout-col ">
            <span>Order Total:</span>
            <span style={{ color: "rgb(247,69,46)" }}>10$</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutInfor;
