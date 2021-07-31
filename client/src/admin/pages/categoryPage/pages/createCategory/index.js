import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Form } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../../../../api/axiosClient";



const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

function CreateCategory() {
  const [form] = Form.useForm();
  const [onEdit, setOnEdit] = useState(false);

  const { token } = useSelector((state) => state.token);


  const history = useHistory();


  const onFinishForm = async (values) => {
    try {
    //   if (onEdit) {
    //     await API.put(
    //       `/api/admin/products/${param.id}`,
    //       { ...product },
    //       {
    //         headers: { Authorization: token },
    //       }
    //     );
    //   } else {
        await API.post(
          "/api/admin/category",
          { ...values },
          {
            headers: { Authorization: token },
          }
        );
      history.push("/admin/categories");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Create category successfully! Check it ",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something wrong. Please try create category again ! ",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  return (
    <div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/products">Categories</Breadcrumb.Item>
          <Breadcrumb.Item>
            {!onEdit ? "Create" : "Update"} Category
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="create_header">
        <div className="create_header-title">
          <span>{!onEdit ? "CREATE" : "UPDATE"} NEW CATEGORY</span>
        </div>
      </div>
      <div className="create_content">
      <div className="create_upload-info">
          <Form
            onFinish={onFinishForm}
            {...layout}
            size="middle"
            form={form}
            initialValues={{
              status: "Stocking",
            }}
          >
            <Form.Item
              label="Category Name"
              name="nameCategory"
              rules={[
                { required: true, message: "Please input category name!" },
              ]}
            >
              <Input placeholder="iPhone..." />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                {onEdit ? "Update" : "Create"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateCategory;
