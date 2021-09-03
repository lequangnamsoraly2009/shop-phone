import React from "react";
import { useSelector } from "react-redux";
import "./inforCheckout.css";

function CheckoutInfor({cart}) {
  const { cartPayMentTemp } = useSelector((state) => state.carts);
  // const shipCode = Math.floor(Math.random() * 20);
//   console.log(cartPayMentTemp);
// console.log(addressTemp.address.length )

  const totalCart = cartPayMentTemp.reduce((item1, item2) => {
    return item1 + item2.price * item2.quantity;
  }, 0);

  return (
    <div className="checkout-wrapper">
      <div className="checkout-header">
        <h2>YOUR ORDER</h2>
      </div>
      <div className="checkout-content">
        <div className="checkout-price">
          {cartPayMentTemp.map((item) => (
            <div key={item._id} className="checkout-col">
              <span style={{ textTransform: "capitalize" }}>
                {item.title}
                <span style={{ marginLeft: 30, color: "red", fontSize: 12 }}>
                  x{item.quantity}
                </span>
              </span>
              <span style={{ color: "rgb(25,144,255)" }}>
                {item.price * item.quantity} $
              </span>
            </div>
          ))}
          <div className="checkout-col">
            <span>Shipping COD:</span>
            <span>{10} $</span>
          </div>
          <div className="checkout-col">
            <span>Voucher Gift:</span>
            <span>{10} $</span>
          </div>
          <div className="checkout-col ">
            <span>Order Total:</span>
            <span style={{ color: "rgb(247,69,46)" }}>
              {totalCart + 10} $
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutInfor;
