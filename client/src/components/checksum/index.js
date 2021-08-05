import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import API from "../../api/axiosClient";

function CheckSumVNPay() {
  const {token} = useSelector((state) => state.token);

  useEffect(() => {
    const vnpay_ipn = async () => {
      const response = await API.get("/api/vnpay_ipn", {
       headers: { Authorization: token },
      });
      console.log(response);

    };
    vnpay_ipn();
  }, [token]);

  return <div className="container-fluid">hi</div>;
}

export default CheckSumVNPay;
