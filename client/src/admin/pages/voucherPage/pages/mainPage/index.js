import { DeleteOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
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
  DatePicker,
  Popconfirm,
} from "antd";
// import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import VoucherAPI from "../../../../../api/voucherAPI";
import { getVoucher } from "../../../../../app/voucherSlice";

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

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

function VoucherMainPage() {
  const [visibleCreateVoucher, setVisibleCreateVoucher] = useState(false);

  const { token } = useSelector((state) => state.token);
  const { vouchers } = useSelector((state) => state.vouchers);

  const dispatch = useDispatch();

  //   console.log(vouchers);

  useEffect(() => {
    dispatch(getVoucher({ token }));
  }, [dispatch, token]);

  // useEffect(() => {
  //   const getDataAllVoucher = async() => {
  //     try {
  //       const result = await VoucherAPI.getVoucher({token});
  //       console.log(result.data.vouchers)
  //     } catch (error) {

  //     }
  //   }
  //   getDataAllVoucher();
  // }, [token]);

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

  // Cancel Delete Voucher Here
  const handleCancelDeleteVoucher = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Ok Không sao. Chúa phù hộ em :v",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // Handle Search Voucher By Name
  const onSearchVoucher = () => {};

  // Handle Delete Voucher
  const handleDeleteVoucher = async (_id) => {
    try {
      const response = await VoucherAPI.deleteVoucher({ _id, token });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Nice Delete!",
        text: `${response.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
      dispatch(getVoucher({ token }));
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Something went wrong!",
        text: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const onFinishCreateVoucher = async (values) => {
    try {
      const { expiryDateCreate, numberCode, status, valueCode, voucherName } =
        values;
      await VoucherAPI.createVoucher({
        token,
        expiryDate: expiryDateCreate._d,
        numberCode,
        status,
        valueCode,
        voucherName,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Create Voucher Success! ",
        showConfirmButton: false,
        timer: 2000,
      });
      setVisibleCreateVoucher(false);
      dispatch(getVoucher({ token }));
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
    // console.log(values);
    // console.log(moment(values.expiryDateCreate._d).format());
    // // console.log(moment("2021-08-18T22:11:08.554+00:00").format())
  };

  // Columns Table Voucher -> Có thể tách ra 1 file riêng nhưng viết chung luôn cho dễ quản lý
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 40,
      key: "stt",
      render: (text, record, index) => (
        <span>{vouchers.findIndex((x) => x._id === record._id) + 1}</span>
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
            to={`/admin/voucher/detail/${record._id}`}
            style={{ color: "rgb(25,144,255)", cursor: "pointer" }}
          >
            <EyeOutlined />
          </Link>
          <div style={{ color: "rgb(25,144,255)", cursor: "pointer" }}>
            <Popconfirm
              title="Are you sure delete it?"
              onConfirm={() => handleDeleteVoucher(record._id)}
              onCancel={handleCancelDeleteVoucher}
              okText="Xóa mẹ nó đi"
              cancelText="Thôi đừng"
            >
              <DeleteOutlined />
            </Popconfirm>
          </div>
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
              placeholder="Search Voucher"
              allowClear
              enterButton="Search Voucher"
              size="middle"
              onSearch={onSearchVoucher}
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
                      max: 200,
                      required: true,
                      message:
                        "Min 1$ and Max 200$ are required! Djt m3 voucher mà phung phí tiền à!!",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="expiryDateCreate" label="Expiry Date">
                  <DatePicker
                    // initialValues={moment("25/08/2021", dateFormatList[0])}
                    format={dateFormatList}
                  />
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
                      message: "This field is required ! Min: 1 unit",
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
            rowKey={(record) => record._id}
            // pagination={{ position: ["none", "none"] }}
            columns={columns}
            dataSource={vouchers}
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

export default VoucherMainPage;
