import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Form, Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import NotificationAPI from "../../../../api/notificationAPI";
import Swal from "sweetalert2";

// import io from "socket.io-client";

const { Option } = Select;

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
  const { token } = useSelector((state) => state.token);
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const socket = io();
  //   setSocket(socket);
  //   return () => socket.close();
  // }, []);

  const onFinishForm = async (values) => {
    try {
      const { notification, contentNotification, typeNotification } = values;
      const response = await NotificationAPI.createNotification({
        token,
        notification,
        contentNotification,
        userSend: {},
        typeNotification,
        hasSeen: false,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Create Notification Successful",
        text: `${response.data.message}`,
        showConfirmButton: false,
        timer: 4000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong!",
        text: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 4000,
      });
    }
  };
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
          <Form onFinish={onFinishForm} {...layout} size="middle" form={form}>
            <Form.Item
              label="Title"
              name="notification"
              rules={[
                { required: true, message: "Please input notification title!" },
              ]}
            >
              <Input placeholder="New Notification" />
            </Form.Item>
            <Form.Item
              label="Content"
              name="contentNotification"
              rules={[
                {
                  required: true,
                  message: "Please input content notification!",
                },
              ]}
            >
              <Input placeholder="You have just received 1 voucher " />
            </Form.Item>
            <Form.Item
              label="Type"
              name="typeNotification"
              rules={[
                {
                  required: true,
                  message: "Please select type notification!",
                },
              ]}
            >
              <Select placeholder="Please select type notification">
                <Option value="new">New</Option>
                <Option value="message">Message</Option>
                <Option value="notification">Notification</Option>
              </Select>
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
