import { Breadcrumb, Steps, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressShipping from "./components/addressShip";
import CheckoutInfor from "./components/inforCheckout";
import PaypalButton from "./PaypalButton";
import API from "../../../../api/axiosClient";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import {
  removeCartPayMentTemp,
  removeManyCart,
} from "../../../../app/cartSlice";
import "./checkout.css";

const { Step } = Steps;

const steps = [
  {
    title: "LOGIN",
  },
  {
    title: "ADDRESS",
    content: (
      <>
        <AddressShipping />
      </>
    ),
  },
  {
    title: "CHECKOUT",
    content: (
      <>
        <CheckoutInfor />
      </>
    ),
  },
];

function CheckOut() {
  const [current, setCurrent] = useState(1);
  const { carts, addressTemp, cartPayMentTemp } = useSelector(
    (state) => state.carts
  );
  const { token } = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const history = useHistory();

  const totalPrice = cartPayMentTemp.reduce((item1, item2) => {
    return item1 + item2.price * item2.quantity;
  }, 0);

  const nextStep = () => {
    setCurrent(current + 1);
  };

  const prevStep = () => {
    setCurrent(current - 1);
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;
    const { notes, phone } = addressTemp;
    await API.post(
      "/api/payment",
      { cart: cartPayMentTemp, paymentID, address, phone, notes},
      {
        headers: { Authorization: token },
      }
    );
    dispatch(removeManyCart(cartPayMentTemp));
    dispatch(removeCartPayMentTemp());
    Swal.fire({
      position: "center",
      icon: "success",
      title: "You have successfully placed an order !",
      showConfirmButton: false,
      timer: 3000,
    });
    setTimeout(() => {
      history.push("/home/cart");
    }, 3000);
  };

  useEffect(() => {
    const updateCartToServer = async () => {
      await API.patch(
        "/users/addcart",
        { cart: [...carts] },
        {
          headers: { Authorization: token },
        }
      );
    };
    updateCartToServer();
  }, [carts, token]);

  return (
    <div className="container-fluid">
      <div className="breadcumb-wrapper">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
            Check Out
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="checkout-steps">
        <Steps current={current} className="steps-line">
          {steps.map((item) => (
            <Step
              style={{ fontSize: 16 }}
              key={item.title}
              title={item.title}
            />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => nextStep()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <PaypalButton total={totalPrice + 10} tranSuccess={tranSuccess} />
          )}
          {current > 1 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prevStep()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
