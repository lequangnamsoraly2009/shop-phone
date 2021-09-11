import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input,Form } from "antd";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";


const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

function CreateNotification() {
  const [form] = Form.useForm();
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    const socket = io();
    setSocket(socket);
    return () => socket.close();
  }, []);

  const onFinishForm = async(values) => {
    try {
      socket.emit("get-data-notification1", {data: values});
      socket.on("get-data-notification2", (data) => {
        console.log(data)
      })
    } catch (error) {
      
    }
  }
  return (
    <div className="container-admin">
      <div className="header_page">
        <h3>Notification</h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/notification">
            Notification
          </Breadcrumb.Item>
          <Breadcrumb.Item>Create Notification</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
        <h1>Form Create Notification</h1>
        <div className="create_upload-info">
          <Form
            onFinish={onFinishForm}
            {...layout}
            size="middle"
            form={form}
            // initialValues={{
            //   status: "Stocking",
            // }}
          >
            <Form.Item
              label="Product Name"
              name="title"
              rules={[
                { required: true, message: "Please input product name!" },
              ]}
            >
              <Input placeholder="iPhone 12 Pro XS Max..." />
            </Form.Item>
            <Form.Item
              label="Product ID"
              name="product_id"
              rules={[{ required: true, message: "Please input product ID!" }]}
            >
              <Input placeholder="IP12PRM" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input description product!",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Monolithic synchronous design with sharp details..."
                showCount
                maxLength={300}
                autoSize={{ maxRows: 2 }}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateNotification;
