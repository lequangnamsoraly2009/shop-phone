import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import API from "../../api/axiosClient";

function VNPAY() {
  const { token } = useSelector((state) => state.token);
  const fakeData = {
    amount: 192929,
    bankCode: "",
    orderDescription: "Co gi dau",
    orderType: "SmartPhone",
    language: "vn",
  };

  const onClickHandle = async () => {
    try {
      const response = await API.post(
        "/api/create_payment_url",
        {
          ...fakeData,
        },
        {
          headers: { Authorization: token },
        }
      );
      // history.push(`${response.data.data}`);
      console.log(response);
    } catch (error) {
      console.log("Fix");
    }
  };

  return (
    <div className="container-fluid">
      <Button type="primary" onClick={() => onClickHandle()}>
        Click Here
      </Button>
    </div>
  );
}

export default VNPAY;
