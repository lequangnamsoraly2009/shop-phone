import React from "react";
import "./cartEmpty.css"

function CartEmpty() {
  return (
    <div className="container-fluid">
      <div className="cart-empty-wrapper">
        <div className="cart-empty-image">
          <img
            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png"
            alt="cartEmpty"
          />
        </div>
        <p className="cart-empty-infor">Your cart is empty</p>
        <div style={{ display: "flex" }}>
          <a
            className="btn"
            style={{ margin: "20px auto", color: "red" }}
            href="/"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default CartEmpty;
