import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  columnDataBuyer,
  columnDataReceiver,
  columnPayment,
  columnTable,
} from "./tableColumn";
import "./tableColumn";

function DetailOrder() {
  const [detailOrder, setDetailOrder] = useState({});
  const [numberOrderUser, setNumberOrderUser] = useState(0);

  const { payments } = useSelector((state) => state.payments);

  const history = useHistory();
  const params = useParams();

  const arrayDetail = [];
  arrayDetail.push({ numberOrderUser, ...detailOrder });

  //   console.log(numberOrderUser);

  useEffect(() => {
    if (params) {
      let sumOrders = 0;
      payments.forEach((payment) => {
        if (payment._id === params.id) {
          setDetailOrder(payment);
        }
        if (payment.user_id === detailOrder.user_id) {
          setNumberOrderUser((sumOrders += 1));
        }
      });
    }
  }, [params, payments, detailOrder, numberOrderUser]);

  const backPreviousPage = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <div className="container-admin">
      <div className="header_page">
        <h3>
          <Button
            style={{ marginRight: 10 }}
            type="dashed"
            icon={<ArrowLeftOutlined />}
            onClick={backPreviousPage}
          />
          Orders From Customers
        </h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/orders">Orders</Breadcrumb.Item>
          <Breadcrumb.Item>Detail Orders</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="container-special">
        <div className="order_header">
          <div className="order_header-buyer">
            <span>Information Buyer</span>
          </div>
          <div className="order_header-infor-buyer">
            <Table
              dataSource={arrayDetail}
              columns={columnDataBuyer}
              style={{ marginLeft: 50 }}
              pagination={{ position: ["none", "none"] }}
            />
          </div>
        </div>
        <div className="order_header">
          <div className="order_header-buyer">
            <span>Information Receiver</span>
          </div>
          <div className="order_header-infor-buyer">
            <Table
              dataSource={arrayDetail}
              columns={columnDataReceiver}
              style={{ marginLeft: 50 }}
              pagination={{ position: ["none", "none"] }}
            />
          </div>
        </div>
        <div className="product_data order_header">
          <div className="order_header-buyer">
            <span>List Items Order</span>
          </div>
          <Table
            rowKey={"_id"}
            style={{ marginLeft: 50 }}
            columns={columnTable}
            dataSource={detailOrder.cart}
            pagination={{ position: ["none", "none"] }}
          />
        </div>
        <div className="order-footer order_header">
          <div className="order_header-buyer">
            <span>Payment</span>
          </div>
          <div className="order_header-infor-buyer">
            <Table
              style={{ marginLeft: 50 }}
              columns={columnPayment}
              dataSource={arrayDetail}
              pagination={{ position: ["none", "none"] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailOrder;
