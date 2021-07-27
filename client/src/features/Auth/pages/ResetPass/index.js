import { Form, Input, Button } from "antd";
import React from "react";
import "./resetpass.css";

function ResetPass() {
  const onSubmitForm = (values) => {
      console.log(values)
  };
  return (
    <div className="container-fluid">
      <div className="reset-header">
        <h2>RESET PASSWORD</h2>
      </div>
      <div className="reset-form">
        <Form
          style={{ margin: "0 auto" }}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onSubmitForm}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid Email!",
              },
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ResetPass;
