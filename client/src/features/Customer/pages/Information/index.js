import {
  Breadcrumb,
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Menu,
} from "antd";
import API from "../../../../api/axiosClient";
import React, { useState } from "react";
import "./information.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function InformationCustomer() {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const [showInformation, setShowInformation] = useState(true);

  const onFinishInformation = async (values) => {
    try {
      await API.patch(
        "/users/infor",
        { ...values },
        {
          headers: { Authorization: token },
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User Information Updated !",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  };

  const onFinishChangePasss = async (values) => {
    console.log(values);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const handleClickShowPass = () => {
    setShowInformation(false);
  };
  const handleClickShowInfor = () => {
    setShowInformation(true);
  };

  return (
    <div className="container-fluid">
      <div className="breadcumb-wrapper">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
            account information
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row gutter={{ xs: 4, sm: 8, md: 8, lg: 12 }}>
        <Col className="gutter-row" span={4}>
          <div className="infor-menu">
            <Menu
              style={{ width: "100%" }}
              defaultSelectedKeys={["1"]}
              // defaultOpenKeys={["sub1"]}
              mode="inline"
            >
              <Menu.Item key="1" onClick={handleClickShowInfor}>
                Information
              </Menu.Item>
              <Menu.Item key="2" onClick={handleClickShowPass}>
                Change Password
              </Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col className="gutter-row" span={20}>
          {showInformation === true ? (
            <>
              <div className="infor-header">
                <span>Account Information</span>
              </div>
              <div className="infor-form">
                <Form
                  style={{ margin: "0 auto" }}
                  {...layout}
                  name="nest-messages"
                  onFinish={onFinishInformation}
                  initialValues={{
                    name: user.userName,
                    phone: user?.phone,
                    email: user.email,
                    age: user.age,
                    introduction: user?.introduction,
                  }}
                >
                  <Form.Item name="name" label="Name" rules={[{ length: 10 }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="phone" label="Phone">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ type: "email" }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="age"
                    label="Age"
                    rules={[{ type: "number", min: 0, max: 99 }]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item name="introduction" label="Bio">
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                      Update
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </>
          ) : (
            <>
              <div className="infor-header">
                <span>Change Your PassWord</span>
              </div>
              <div className="infor-form">
                <Form
                  style={{ margin: "0 auto" }}
                  {...layout}
                  name="nest-messages"
                  onFinish={onFinishChangePasss}
                >
                  <Form.Item
                    label="Current Password"
                    name="oldPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your current password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your new password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Confirm New Password"
                    name="newPasswordConfirm"
                    rules={[
                      {
                        required: true,
                        message: "Please input confirm your new password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                      Update
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default InformationCustomer;
