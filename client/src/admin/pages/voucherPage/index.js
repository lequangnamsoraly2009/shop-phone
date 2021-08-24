import { EyeOutlined, HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Table,
  Input,
  Space,
  Drawer,
  InputNumber,
  Form,
  Select,
} from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 24,
  },
};

function VoucherPage() {
  const [visibleCreateVoucher, setVisibleCreateVoucher] = useState(false);

  const handleOnclickReload = () => {
    // dispatch(setSearchPayments(""));
    window.location.reload();
  };

  const handleOnclickCreateVoucher = () => {
    setVisibleCreateVoucher(true);
  };

  const onCloseCreateVoucher = () => {
    setVisibleCreateVoucher(false);
  };

  const onFinishCreateVoucher = (values) => {
    console.log(values);
  };

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
            <Drawer
              title="Create Voucher"
              placement="right"
              closable={false}
              width="1000px"
              onClose={onCloseCreateVoucher}
              visible={visibleCreateVoucher}
            >
              <Form
                {...layout}
                name="formCreateVoucher"
                onFinish={onFinishCreateVoucher}

                // validateMessages={validateMessages}
              >
                <Form.Item
                  name="voucherName"
                  label="Voucher Name"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="valueCode"
                  label="Value Code"
                  hasFeedback
                  rules={[
                    {
                        type: "number",
                        min: 1,
                        max: 20,
                        required: true,
                        message:
                          "Min 1$ and Max 20$ are required! Djt m3 voucher mà phung phí tiền à! 20$ là 450k vnđ đấy!",
                      },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="expiryDate" label="Expiry Date">

                </Form.Item>
                <Form.Item
                  name="numberCode"
                  label="Number Code"
                  hasFeedback
                  rules={[
                    {
                      type: "number",
                      min: 1,
                      required: true,
                      message:"This field is required ! Min: 1 unit"
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Status Voucher"
                  name="status"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please select status voucher!",
                    },
                  ]}
                >
                  <Select showSearch placeholder="Search or select">
                    <Option value="Public">Public</Option>
                    <Option value="Private">Private</Option>
                    <Option value="Disable">Disable</Option>
                  </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Drawer>
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
