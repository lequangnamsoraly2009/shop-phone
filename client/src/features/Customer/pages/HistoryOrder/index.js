import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import "./historyOrder.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function HistoryOrder() {
  const params = useParams();
  const [orderDetail, setOrderDetail] = useState({});
  const { history } = useSelector((state) => state.histories);
  console.log(orderDetail);

  useEffect(() => {
    history.forEach((item) => {
      if (item._id === params.id) {
        setOrderDetail(item);
      }
    });
  }, [history, params]);

  return (
    <div className="container-fluid">
      <div className="breadcumb-wrapper">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
            History
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="order-header">
        <h3 style={{ fontWeight: 300, fontSize: 20 }}>
          {`Order details #${orderDetail.paymentID?.split("-")[1]}`} -{" "}
          <strong>Delivery Success</strong>
        </h3>
      </div>
      <div className="order-date-delivery">
        <span style={{ marginRight: 5 }}>Date of Purchase:</span>
        <span>{new Date(orderDetail.createdAt).toLocaleString("vi-GB")}</span>
      </div>
      <div className="order-infor-receiver">
      </div>
    </div>
  );
}

export default HistoryOrder;
