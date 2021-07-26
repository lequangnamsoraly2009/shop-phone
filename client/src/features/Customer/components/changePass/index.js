import { Button, Input, Form } from "antd";
import React from "react";
import "./changepass.css";

function ChangePass() {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const onFinishChangePasss = async (values) => {
    console.log(values);
  };

  return (
    <div>
      <div className="infor-banner">
        <span>
          By choosing to change your password, you increase the security of your
          account 😘 !
        </span>
      </div>
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
          <Form.Item  wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button style={{margin: "20px 0"}} type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ChangePass;
