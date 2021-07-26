import { Button, Input, Form } from "antd";
import React from "react";
import "./changepass.css";
import API from "../../../../api/axiosClient";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function ChangePass() {
  const { token } = useSelector((state) => state.token);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const onFinishChangePasss = async (values) => {
    try {
      await API.patch(
        "/users/password",
        { ...values },
        { headers: { Authorization: token } }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your password has been changed",
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
            name="newPassword"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPasswordConfirm"
            label="Confirm Password"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              style={{ margin: "20px 0" }}
              type="primary"
              htmlType="submit"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ChangePass;
