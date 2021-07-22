import React from "react";
import { Breadcrumb, Table, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./history.css";

function HistoryCustomer() {
  const { history } = useSelector((state) => state.histories);
  console.log(history);

  const columns = [
    {
      title: "Code Orders",
      dataIndex: "paymentID",
      key: "paymentID",
      render: (text, record, index) => (
        <Link to={`/customer/history/${record._id}`} style={{ fontSize: 12 }}>
          {record.paymentID}
        </Link>
      ),
      width: 300,
    },
    {
      title: "Purchase Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record, index) => (
        <span style={{ fontSize: 12 }}>
          {new Date(record.createdAt).toLocaleString("en-GB")}
        </span>
      ),
      width: 160,
    },
    {
      title: "Products",
      dataIndex: "cart",
      key: "cart",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => (
        <>
          {record.cart.length === 1 ? (
            <Tooltip
              placement="topLeft"
              style={{ fontSize: 12 }}
              title={record.cart[0].title}
            >
              <span style={{ fontSize: 12, textTransform: "capitalize" }}>
                {record.cart[0].title}
              </span>
            </Tooltip>
          ) : (
            <Tooltip
              placement="topLeft"
              style={{ fontSize: 12 }}
              title={`${record.cart[0].title} and ${
                record.cart.length - 1
              } other products`}
            >
              <span style={{ fontSize: 12, textTransform: "capitalize" }}>
                {record.cart[0].title} and {record.cart.length - 1} other
                products
              </span>
            </Tooltip>
          )}
        </>
      ),
    },
    {
      title: "Total Price",
      dataIndex: "price",
      key: "price",
      render: (text, record, index) => (
        <>
          {
            <span style={{ fontSize: 12 }}>
              {record.cart.reduce((item1, item2) => {
                return item1 + item2.price * item2.quantity;
              }, 0)}
            </span>
          }
        </>
      ),
      width: 140,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <span style={{ fontSize: 12, color: "green" }}>Success</span>,
      width: 140,
    },
  ];

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
      <div className="history-banner">
        <span>
          Thank you for trusting and supporting the shop in the past time 😘 !
        </span>
      </div>
      <div className="history-header">
        <h2>Your History Order</h2>
      </div>
      <div className="history-table">
        <Table columns={columns} dataSource={history} />
        {/* Theem key vao dataSource */}
      </div>
    </div>
  );
}

export default HistoryCustomer;
