import { Form, Input, Button, Checkbox, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import API from "../../../../api/axiosClient";
import "./login.css";
import { setToken } from "../../../../app/tokenSlice";
import { loginPending } from "../../../../app/userSlice";
import GoogleLogin from "react-google-login";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loadingLogin, setLoadingLogin] = useState(false);

  const onSubmitForm = async (values) => {
    try {
      dispatch(loginPending());
      setLoadingLogin(true);
      const response = await API.post("/users/login", { ...values });
      dispatch(setToken(response.data.accessToken));
      localStorage.setItem("firstLogin", true);
      setLoadingLogin(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Signed in successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/home");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
      setLoadingLogin(false);
    }
  };

  const onSuccessGoogle = async (values) => {
    try {
      dispatch(loginPending());
      setLoadingLogin(true);
      const response = await API.post("/users/login_google", {
        ...values.profileObj,
      });
      dispatch(setToken(response.data.accessToken));
      localStorage.setItem("firstLogin", true);
      setLoadingLogin(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Signed in successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/home");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
      setLoadingLogin(false);
    }
  };
  const onFailureGoogle = (response) => {
    console.log("Fail res", response);
  };
  return (
    <div className="container-fluid">
      {loadingLogin === true ? (
        <div className="loading-page">
          <Spin size="large" />
        </div>
      ) : (
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
            <GoogleLogin
              clientId="191429477921-djsmrc5pi7mig0q7b609idkaqmiqi55f.apps.googleusercontent.com"
              render={(renderProps) => (
                <img
                  style={{ cursor: "pointer" }}
                  width="129px"
                  height="37px"
                  alt="google-login__button"
                  src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                />
              )}
              onSuccess={onSuccessGoogle}
              onFailure={onFailureGoogle}
              isSignedIn={true}
              cookiePolicy={"single_host_origin"}
            />
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
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
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

                <a className="login-form-forgot" href="/buyer/resetpassword">
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
      )}
    </div>
  );
}

export default Login;
