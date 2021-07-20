import { Form, Input, Button, Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addAddressTemp } from "../../../../../../app/cartSlice";
import "./addressShip.css";

const { Option } = Select;

function AddressShipping() {
  const dispatch = useDispatch();
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
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="85">+85</Option>
      </Select>
    </Form.Item>
  );
  const onSubmitForm = (values) => {
    dispatch(addAddressTemp(values));
  };

  return (
    <div className="address-wrapper">
      <div className="address-header">
        <h2>ADDRESS SHIPPING</h2>
      </div>
      <div className="address-content">
        <Form
          {...formItemLayout}
          //   form={form}
          name="form-address"
          onFinish={onSubmitForm}
        >
          <Form.Item
            name="yourName"
            label="Name"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input address!" }]}
          >
            <Input placeholder="Your address. Place you receive it!" />
          </Form.Item>
          <Form.Item
            name="notes"
            label="Order Note"

            // rules={[{ required: true, message: "Please input address!" }]}
          >
            <Input placeholder="Notes about your order ?" />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddressShipping;
