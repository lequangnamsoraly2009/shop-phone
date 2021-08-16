import React from "react";
import { Modal, Form, Input, Rate } from "antd";

function ModalAsk({ visible, onCancel, onFinish }) {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new question about this phone"
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
          name="question"
          label="Question"
          rules={[
            {
              required: true,
              message: "Please input the question!",
            },
          ]}
        >
          <Input.TextArea autoSize={{minRows: 4, maxRows: 4}}/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalAsk;
