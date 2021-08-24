import { EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Table, Input, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Search } = Input;

function VoucherPage() {
  const handleOnclickReload = () => {
    // dispatch(setSearchPayments(""));
    window.location.reload();
  };

  const handleOnclickCreateVoucher = () => {};

  // Columns Table Voucher -> Có thể tách ra 1 file riêng nhưng viết chung luôn cho dễ quản lý
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 40,
      key: "stt",
      render: (text, record, index) => (
        <span>
          {/* {paginationPayments.findIndex((x) => x._id === record._id) + 1} */}
        </span>
      ),
    },
    {
      title: "Voucher Name ",
      dataIndex: "voucherName",
      key: "voucherName",
      render: (text, record, index) => (
        <span style={{ textTransform: "uppercase" }}>{record.voucherName}</span>
      ),
      align: "center",
    },
    {
      title: "Value Code",
      dataIndex: "valueCode",
      key: "valueCode",
      render: (text, record, index) => <span>{record.valueCode}</span>,
      align: "center",
    },
    {
      title: "Number Code",
      dataIndex: "numberCode",
      key: "numberCode",
      render: (text, record, index) => <span>{record.numberCode}</span>,
      align: "center",
    },
    {
      title: "Number Code Remain",
      dataIndex: "numberCodeRemain",
      key: "numberCodeRemain",
      render: (text, record, index) => <span>{record.numberCodeRemain}</span>,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => (
        <>
          {record.status === "Private" ? (
            <span style={{ textTransform: "capitalize", color: "red" }}>
              {record.status}
            </span>
          ) : record.status === "Disable" ? (
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
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (text, record, index) => (
        <span>{new Date(record.expiryDate).toLocaleString("en-GB")}</span>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="large">
          <Link
            to={`/admin/orders/${record._id}`}
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
        <h3>Total Voucher Here</h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Vouchers</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="product_data">
        <div className="product_data-header">
          <h3>Data Table Vouchers</h3>
        </div>
        <div className="product_data-wrapper">
          <div className="product_data-create">
            <Button onClick={handleOnclickReload} type="primary">
              Reload Page
            </Button>
          </div>
          <div className="product_data-search">
            <Search
              placeholder="Search Order"
              allowClear
              enterButton="Search Order"
              size="middle"

              //   onSearch={onSearch}
            />
          </div>
          <div className="product_data-create">
            <Button onClick={handleOnclickCreateVoucher} type="primary">
              Create Voucher
            </Button>
          </div>
        </div>
        <div className="product_data-table">
          {/* <Skeleton
            active
            loading={isLoading}
            paragraph={{ rows: 10 }}
            title={{ width: "100%" }}
          > */}
          <Table
            style={{ border: "1px solid #000" }}
            rowKey="_id"
            pagination={{ position: ["none", "none"] }}
            columns={columns}
            //   dataSource={payments}
          />
          {/* </Skeleton> */}
        </div>
        {/* <div className="product_data-pagination">
          {paginationPayments.length <= 10 ? (
            ""
          ) : (
            <Pagination
              defaultCurrent={1}
              total={paginationPayments.length}
              showSizeChanger={false}
              pageSize={10}
              onChange={(page, pageSize) => handleChangePage(page, pageSize)}
            />
          )}
        </div> */}
      </div>
    </div>
  );
}

export default VoucherPage;
