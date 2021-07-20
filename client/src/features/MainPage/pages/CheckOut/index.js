import { Breadcrumb, Steps, Button, message } from "antd";
import React, { useState } from "react";
import "./checkout.css"

const { Step } = Steps;

const steps = [
  {
    title: "LOGIN",
    content: "login",
  },
  {
    title: "SHIPPING ADDRESS",
    content: "address",
  },
  {
    title: "CHECKOUT",
    content: "checkout",
  },
  {
    title: "RESULT",
    content: "result",
  }
];

function CheckOut() {
  const [current, setCurrent] = useState(0);

  const nextStep = () => {
    setCurrent(current + 1);
  };

  const prevStep = () => {
    setCurrent(current - 1);
  };

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
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
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
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Thank You! Back To Home
            </Button>
          )}
          {current > 0 && (
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
