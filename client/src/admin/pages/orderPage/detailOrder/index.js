import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { CommonLoading } from "react-loadingg";
import {
  columnDataBuyer,
  columnDataReceiver,
  columnTable,
} from "./tableColumn";
import "./tableColumn";
import PaymentAPI from "../../../../api/paymentAPI";
import { getPaymentToDetail } from "../../../../app/paymentSlice";
import axiosClient from "../../../../api/axiosClient";
import { saveAs } from "file-saver";
import MailerAPI from "../../../../api/mailerAPI";

function DetailOrder() {
  const [totalPaymentOfUser, setTotalPaymentOfUser] = useState(1);
  const [userBuyer, setUserBuyer] = useState({});
  const [awaitPrint, setAwaitPrint] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const { detailPayment, payments } = useSelector((state) => state.payments);
  const { token } = useSelector((state) => state.token);
  const { users } = useSelector((state) => state.usersAdmin);

  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const arrayDetailBuyer = [];
  arrayDetailBuyer.push({ totalPaymentOfUser, ...userBuyer });

  const arrayDetail = [{ ...detailPayment }];

  useEffect(() => {
    dispatch(getPaymentToDetail({ token, idPayment: params.id }));
  }, [dispatch, token, params]);

  useEffect(() => {
    users.forEach((user) => {
      if (user._id === detailPayment.user_id) {
        setUserBuyer(user);
      }
    });
  }, [detailPayment, users]);

  useEffect(() => {
    let sum = 0;
    payments.forEach((payment) => {
      if (payment.user_id === detailPayment.user_id) {
        sum = sum + 1;
      }
    });
    setTotalPaymentOfUser(sum);
  }, [payments, detailPayment]);

  const backPreviousPage = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleAcceptPayment = async () => {
    try {
      setLoadingPage(true);
      const statusChange = "Success";
      const response = await PaymentAPI.changeStatusPayment({
        token,
        _id: detailPayment?._id,
        status: statusChange,
      });

      await MailerAPI.sendReceiptMail({
        token,
        detailPayment,
        user: userBuyer,
      });
      setLoadingPage(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successful!",
        text: `${response.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong!",
        text: `${error.response?.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleCancelPayment = async () => {
    try {
      const statusChange = "Cancel";
      const response = await PaymentAPI.changeStatusPayment({
        token,
        _id: detailPayment?._id,
        status: statusChange,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successful!",
        text: `${response.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong!",
        text: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleRestorePayment = async () => {
    try {
      const statusChange = "Pending";
      const response = await PaymentAPI.changeStatusPayment({
        token,
        _id: detailPayment?._id,
        status: statusChange,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successful Restore!",
        text: `${response.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong!",
        text: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleClickAwaitPrintPDF = async () => {
    try {
      setAwaitPrint(true);
      await axiosClient.post(
        "/api/create-pdf",
        {
          detailPayment,
        },
        {
          headers: { Authorization: token },
        }
      );

      const response = await axiosClient.get("/api/fetch-pdf", {
        responseType: "blob",
        headers: { Authorization: token },
      });

      const pdfBlob = new Blob([response.data], {
        type: "application/pdf",
      });
      saveAs(pdfBlob, `RECEIPT-${detailPayment._id}.pdf`);
    } catch (error) {}
  };

  const handleClickPrintPDF = async () => {
    try {
      const response = await axiosClient.get("/api/fetch-pdf", {
        responseType: "blob",
        headers: { Authorization: token },
      });

      const pdfBlob = new Blob([response.data], {
        type: "application/pdf",
      });
      saveAs(pdfBlob, `RECEIPT-${detailPayment._id}.pdf`);
      setAwaitPrint(false);
    } catch (error) {}
  };

  const columnPayment = [
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      render: (text, record, index) => (
        <span>
          {record.cart?.reduce((item1, item2) => {
            return item1 + item2.price * item2.quantity;
          }, 0)}
          $
        </span>
      ),
    },
    {
      title: "Price Sale",
      dataIndex: "price_sale",
      key: "price_sale",
      align: "center",
      render: (text, record, index) => (
        <span>
          {record.cart
            ?.reduce((item1, item2) => {
              return item1 + (item2.price * item2.quantity * item2.sale) / 100;
            }, 0.0)
            .toFixed(2)}
          $
        </span>
      ),
    },
    {
      title: "Fee Shipping",
      dataIndex: "feeShipValue",
      key: "feeShipValue",
      align: "center",
      render: (text, record, index) => <span>{record.feeShipValue}$</span>,
    },
    {
      title: "Gift Voucher",
      dataIndex: "voucherValue",
      key: "voucherValue",
      align: "center",
      render: (text, record, index) => <span>{record.voucherValue}$</span>,
    },
    {
      title: "Total Price To Pay",
      dataIndex: "price_pay",
      key: "price_pay",
      align: "center",
      render: (text, record, index) => (
        <span>
          {record.cart?.reduce((item1, item2) => {
            return (
              item1 +
              (item2.price * item2.quantity -
                ((item2.price * item2.quantity * item2.sale) / 100).toFixed(2))
            );
          }, record.feeShipValue - record.voucherValue)}
          $
        </span>
      ),
    },
    {
      title: "Print Invoice",
      key: "print_invoice",
      align: "center",
      render: (text, record, index) =>
        record.status === "Cancel" ? (
          "No Invoice"
        ) : awaitPrint === false ? (
          <Button
            onClick={() => {
              handleClickAwaitPrintPDF();
            }}
            type="primary"
          >
            Prepare PDF
          </Button>
        ) : (
          <Button
            onClick={() => {
              handleClickPrintPDF();
            }}
            type="primary"
          >
            Print PDF
          </Button>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text, record, index) =>
        record.status === "Pending" ? (
          <span style={{ color: "red" }}>{record.status}</span>
        ) : record.status === "Success" ? (
          <span style={{ color: "green" }}>{record.status}</span>
        ) : (
          <span style={{ color: "gray" }}>{record.status}</span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text, record, index) => (
        <Space size="middle">
          {record.status === "Success" ? (
            <span>Done</span>
          ) : record.status === "Cancel" ? (
            <Button onClick={() => handleRestorePayment()} type="danger">
              Restore
            </Button>
          ) : (
            <>
              <Button onClick={() => handleAcceptPayment()} type="primary">
                Accept and Delivery
              </Button>
              <Button onClick={() => handleCancelPayment()} type="danger">
                Cancel
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="container-admin">
      {loadingPage === true ? (
        <CommonLoading />
      ) : (
        <>
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
                  rowKey={Math.random() * 100000}
                  dataSource={arrayDetailBuyer}
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
                  rowKey={Math.random() * 100000}
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
                rowKey={(record) => record.product_id}
                style={{ marginLeft: 50 }}
                columns={columnTable}
                dataSource={detailPayment.cart}
                pagination={{ position: ["none", "none"] }}
              />
            </div>
            <div className="order-footer order_header">
              <div className="order_header-buyer">
                <span>Payment</span>
              </div>
              <div className="order_header-infor-buyer">
                <Table
                  rowKey={Math.random() * 100000}
                  style={{ marginLeft: 50 }}
                  columns={columnPayment}
                  dataSource={arrayDetail}
                  pagination={{ position: ["none", "none"] }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailOrder;
