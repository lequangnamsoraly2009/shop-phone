import { Form, Input, Button, Checkbox, Select } from "antd";
import React from "react";
import "../Login/login.css";
import "./register.css";
import Swal from "sweetalert2";
import API from "../../../../api/axiosClient";
// import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginPending } from "../../../../app/userSlice";
// import { setToken } from "../../../../app/tokenSlice";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Register() {
  // const history = useHistory();
  const dispatch = useDispatch();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="85">+85</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="88">+88</Option>
      </Select>
    </Form.Item>
  );

  const onSubmitForm = async (values) => {
    dispatch(loginPending());
    try {
      const res = await API.post("/users/register", { ...values });
      // dispatch(setToken(response.data.accessToken));
      // localStorage.setItem("firstLogin", true);
      if (res.data.ok === true) {
        await Swal.fire({
          position: "center",
          icon: "success",
          text: "Please visit your email address and active your account",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  };
  return (
    <div className="container-fluid">
      <div className="login">
        <div className="title-login">
          <p>REGISTER</p>
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
        <div className="register-form__wrap">
          <Form
            {...formItemLayout}
            name="register"
            onFinish={onSubmitForm}
            scrollToFirstError
          >
            <Form.Item
              name="userName"
              label="UserName"
              rules={[
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="passwordConfirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
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

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                type="number"
                addonBefore={prefixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            {/* <Form.Item
              label="Captcha"
              extra="We must make sure that your are a human."
            >
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "Please input the captcha you got!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Button>Get captcha</Button>
                </Col>
              </Row>
            </Form.Item> */}

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="/#">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
