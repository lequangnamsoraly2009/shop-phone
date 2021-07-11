import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React from "react";
import {useHistory} from "react-router-dom"
// import axios from "axios"
import API from "../../../../api/axiosClient"
import "./login.css";

function Login() {

  const history = useHistory()

    const onSubmitForm = async(values) =>{
        try {
          await API.post("/users/login", {...values})

          localStorage.setItem("firstLogin",true);

          history.push("/");

        } catch (error) {
          alert(error.response.data.message);
        }
    }
  return (
    <div className="container-fluid">
      <div className="login">
        <div className="title-login">
          <p>LOGIN</p>
        </div>
        <div className="social-login">
          <a href="/" className="facebook-login__button">
            <img
              width="129px"
              height="37px"
              alt="facebook-login__button"
              src="https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
            />
          </a>
          <a href="/" className="google-login__button">
            <img
              width="129px"
              height="37px"
              alt="google-login__button"
              src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
            />
          </a>
        </div>
        <div className="login-form__wrap">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onSubmitForm}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="/">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in      
              </Button>
              Or <a href="/buyer/register">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
