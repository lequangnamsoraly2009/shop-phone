import { Breadcrumb, Form, Input, InputNumber, Button } from "antd";
import API from "../../../../api/axiosClient";
import React from "react";
import "./information.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";


function InformationCustomer() {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const onFinish = async (values) => {
    try {
      await API.patch("/users/infor",{...values},{
        headers: { Authorization: token },
      }
    );
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'User Information Updated !',
      showConfirmButton: false,
      timer: 1500
    })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
   
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
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
      <div className="infor-header">
        <span>Account Information</span>
      </div>
      <div className="infor-form">
        <Form
          style={{ margin: "0 auto" }}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
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
          <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
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
    </div>
  );
}

export default InformationCustomer;
