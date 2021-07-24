import React, { useEffect, useState } from "react";
import { Breadcrumb, Table } from "antd";
import "./historyOrder.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { columnTable } from "./columnPage";

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
        <div className="order-infor-address-wrapper">
          <span
            style={{
              color: "#000",
              fontWeight: 600,
              fontSize: 20,
              margin: "0 auto",
              borderBottom: "2px solid rgb(25,144,255)",
            }}
          >
            INFORMATION OF USER
          </span>
          <div className="order-infor-wrapper">
            <div className="order-infor-address">
              <span>
                <span style={{ color: "#000", fontWeight: 800 }}>
                  Address:{" "}
                </span>
                {orderDetail.address?.line1} - {orderDetail.address?.city} -{" "}
                {orderDetail.address?.state} -{" "}
                {orderDetail.address?.country_code}
              </span>
              {orderDetail.phone === "" || orderDetail.phone === undefined ? (
                <span>
                  <span style={{ color: "#000", fontWeight: 800 }}>Phone:</span>{" "}
                  0xxxxxx295
                </span>
              ) : (
                <span>
                  <span style={{ color: "#000", fontWeight: 800 }}>Phone:</span>{" "}
                  0{orderDetail.phone}
                </span>
              )}
            </div>
            <div className="order-infor-delivery">
              <span>
                <span
                  style={{ color: "#000", fontWeight: 800, marginRight: 5 }}
                >
                  Delivery Way:
                </span>
                Economical delivery
              </span>
              <span>
                <span style={{ color: "red", fontWeight: 800, marginRight: 5 }}>
                  Ship:
                </span>
                10.0 $
              </span>
            </div>
            <div className="order-infor-status">
              <span style={{ color: "#000", fontWeight: 800 }}>Status: </span>
              <span style={{ color: "green" }}>Delivery Success</span>
            </div>
          </div>
        </div>
      </div>
      <div className="order-table">
        <Table columns={columnTable} dataSource={orderDetail.cart} />
      </div>
      <div className="order-total">
        <div className="order-total-item">
          <span>Tam Tinh</span>
          <span>385.000$</span>
        </div>
        <div className="order-total-item">
          <span>Tam Tinh</span>
          <span>385.000$</span>
        </div>
        <div className="order-total-item">
          <span>Tam Tinh</span>
          <span style={{ color: "red", fontSize: 20 , fontWeight: 800 }}>385.000$</span>
        </div>
      </div>
    </div>
  );
}

export default HistoryOrder;
