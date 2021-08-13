import React from "react";
import { Modal, Form, Input } from "antd";

function ModelReview({ visible, onCancel, onFinish }) {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new review"
      okText="Post"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onFinish(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of review!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="message" label="Description" rules={[
            {
              required: true,
              message: "Please input the description of review!",
            },
          ]}>
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModelReview;
