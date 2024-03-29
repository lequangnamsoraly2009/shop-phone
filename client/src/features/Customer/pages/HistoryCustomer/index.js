import React, { useEffect } from "react";
import { Breadcrumb, Table, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./history.css";
import { getHistoryCustomer } from "../../../../app/historySlice";

function HistoryCustomer() {
  const { history } = useSelector((state) => state.histories);
  const { token } = useSelector((state) => state.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistoryCustomer(token));
  }, [dispatch, token]);

  const columns = [
    {
      title: "Code Orders",
      dataIndex: "paymentID",
      key: "paymentID",
      render: (text, record, index) => (
        <Link to={`/customer/history/${record._id}`} style={{ fontSize: 12 }}>
          {record._id}
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
              {Number(
                record.cart.reduce((item1, item2) => {
                  return (
                    item1 +
                    item2.price * item2.quantity -
                    ((item2.price * item2.quantity * item2.sale) / 100).toFixed(
                      2
                    )
                  );
                }, 0)
              ) -
                Number(record.voucherValue) +
                Number(record.feeShipValue)}{" "}
              $
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
      render: (text, record, index) =>
        record.status === "Pending" ? (
          <span style={{ fontSize: 12, color: "red" }}>{record.status}</span>
        ) : record.status === "Success" ? (
          <span style={{ fontSize: 12, color: "green" }}>{record.status}</span>
        ) : (
          <span style={{ fontSize: 12, color: "gray" }}>{record.status}</span>
        ),
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
        <Table columns={columns} rowKey="_id" dataSource={history} />
        {/* Theem key vao dataSource */}
      </div>
    </div>
  );
}

export default HistoryCustomer;
