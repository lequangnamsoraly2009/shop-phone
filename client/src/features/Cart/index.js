import React from "react";
import { useSelector } from "react-redux";
import CartEmpty from "./components/CartEmpty";

function Cart() {
  const { carts } = useSelector((state) => state.carts);

  if (carts.length === 0) {
    return <CartEmpty />;
  }

  return <div className="container-fluid">Hi Cart</div>;
}

export default Cart;
