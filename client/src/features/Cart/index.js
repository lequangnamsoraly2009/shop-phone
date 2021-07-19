import React from "react";
import { useSelector } from "react-redux";
import CartBanner from "./components/CartBanner";
import CartEmpty from "./components/CartEmpty";

function Cart() {
  const { carts } = useSelector((state) => state.carts);

  if (carts.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="container-fluid">
      <div className="cart-full-wrapper">
        <CartBanner />
      </div>
    </div>
  );
}

export default Cart;
