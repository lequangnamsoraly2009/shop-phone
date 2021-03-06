import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import CategoryAPI from "../../../../../api/categoryAPI";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

function CreateCategory() {
  const [onEdit, setOnEdit] = useState(false);
  
  const param = useParams();
  const [form] = Form.useForm();

  const { token } = useSelector((state) => state.token);
  const { categories } = useSelector((state) => state.categories);

  const history = useHistory();

  const backPreviousPage = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const onFinishForm = async (values) => {
    try {
      if (onEdit) {
        await CategoryAPI.editCategory(values, param, token);
        history.push("/admin/categories");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update category successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        await CategoryAPI.createCategory(values, token);
        history.push("/admin/categories");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Create category successfully! Check it ",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something wrong. Please try again. Try again ! ",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  // Area Update Product
  // Form của thằng Antd này không cho phép load data trực tiếp lên mà phải dùng thằng Form của useForm
  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      categories.forEach((category) => {
        if (category._id === param.id) {
          // Here Faqs of Antd
          form.setFieldsValue({
            nameCategory: category.nameCategory,
            _id: category._id,
          });
        }
      });
    } else {
      setOnEdit(false);
    }
  }, [param.id, categories, form]);

  return (
    <div className="container-admin">
      <div className="header_page">
        <h3>
          <Button
            style={{ marginRight: 10 }}
            type="dashed"
            icon={<ArrowLeftOutlined />}
            onClick={backPreviousPage}
          />
          Change New Name Category
        </h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/categories">Categories</Breadcrumb.Item>
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
            initialValues={{}}
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
