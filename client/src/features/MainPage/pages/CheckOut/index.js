import { Breadcrumb, Steps, Button } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import "./checkout.css";
import AddressShipping from "./components/addressShip";
import CheckoutInfor from "./components/inforCheckout";
import PaypalButton from "./PaypalButton";

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
  // const { addressTemp } = useSelector((state) => state.carts);
  const  { addressTemp, cartPayMentTemp} = useSelector((state) => state.carts)

  const totalPrice = cartPayMentTemp.reduce((item1, item2) => {
    return item1 + item2.price * item2.quantity;
  },0)

  const nextStep = () => {
    setCurrent(current + 1);
  };

  const prevStep = () => {
    setCurrent(current - 1);
  };

  const tranSuccess = async(payment)=>{
    console.log(payment,addressTemp);
  }

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
          {current < steps.length - 1 &&(
            <Button type="primary" onClick={() => nextStep()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && <PaypalButton total={totalPrice + 10} tranSuccess={tranSuccess} />}
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
