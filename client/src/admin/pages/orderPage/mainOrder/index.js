import { EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Skeleton, Table, Input, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPayments,
  setPaginationPayments,
  setSearchPayments,
} from "../../../../app/paymentSlice";
import API from "../../../../api/axiosClient";

const { Search } = Input;

function MainOrder() {
  const { token } = useSelector((state) => state.token);
  const { payments, searchPayments, paginationPayments } = useSelector(
    (state) => state.payments
  );
  const dispatch = useDispatch();
  // Search Categories Here
  const onSearch = async (value) => {
    dispatch(setSearchPayments(value.toLowerCase()));
    const response = await API.get(
      `/api/admin/payment?limit&&&email[regex]=${searchPayments}`,
      {
        headers: { Authorization: token },
      }
    );
    dispatch(getPayments(response.data.payments));
    dispatch(setPaginationPayments(response.data.payments));
  };

  // Columns Table Category -> Có thể tách ra 1 file riêng nhưng viết chung luôn cho dễ quản lý
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 40,
      key: "stt",
      render: (text, record, index) => (
        <span>{payments.findIndex((x) => x._id === record._id) + 1}</span>
      ),
    },
    {
      title: "PaymentID",
      dataIndex: "paymentID",
      key: "paymentID",
      render: (text, record, index) => <span>{record.paymentID}</span>,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => (
        <span style={{ textTransform: "capitalize" }}>{record.name}</span>
      ),
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record, index) => <span>{record.email}</span>,
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text, record, index) => (
        <span style={{ textTransform: "capitalize" }}>
          {record.phone === undefined ? "Unknown" : record.phone}
        </span>
      ),
      align: "center",
    },
    {
      title: "Products Number",
      dataIndex: "cart",
      key: "cart",
      render: (text, record, index) => <span>{record.cart.length}</span>,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => (
        <>
          {record.status === "Pending" ? (
            <span style={{ textTransform: "capitalize", color: "red" }}>
              {record.status}
            </span>
          ) : record.status === "Cancel" ? (
            <span style={{ textTransform: "capitalize", color: "gray" }}>
              {record.status}
            </span>
          ) : (
            <span style={{ textTransform: "capitalize", color: "green" }}>
              {record.status}
            </span>
          )}
        </>
      ),
      align: "center",
    },
    {
      title: "Purchase Of Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record, index) => (
        <span>{new Date(record.createdAt).toLocaleString("en-GB")}</span>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="large">
          <Link
            to={`/admin/users/${record._id}`}
            style={{ color: "rgb(25,144,255)", cursor: "pointer" }}
          >
            <EyeOutlined />
          </Link>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <div className="container-admin">
      <div className="header_page">
        <h3>Orders From Customers</h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Orders</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="product_data">
        <div className="product_data-header">
          <h3>Data Table Orders</h3>
        </div>
        <div className="product_data-wrapper">
          <div className="product_data-search">
            <Search
              placeholder="Search Order"
              allowClear
              enterButton="Search Order"
              size="middle"
              onSearch={onSearch}
            />
          </div>
          <div className="product_data-create">
            <Button type="primary">Reload Page</Button>
          </div>
        </div>
        <div className="product_data-table">
          {/* <Skeleton
            active
            // loading={isLoading}
            paragraph={{ rows: 10 }}
            title={{ width: "100%" }}
          > */}
          <Table
            style={{ border: "1px solid #000" }}
            bordered
            showHeader
            rowKey="_id"
            pagination={{ position: ["none", "none"] }}
            columns={columns}
            dataSource={payments}
          />
          {/* </Skeleton> */}
        </div>
        <div className="product_data-pagination">
          {/* {paginationUsers.length <= 10 ? (
            ""
          ) : (
            <Pagination
              defaultCurrent={1}
              total={paginationUsers.length}
              showSizeChanger={false}
              pageSize={10}
              onChange={(page, pageSize) => handleChangePage(page, pageSize)}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default MainOrder;
