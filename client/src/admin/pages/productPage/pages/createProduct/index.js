import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Input, Form, Select, Button } from "antd";
import React, { useState } from "react";
import UploadImage from "../uploadImage";
import "./createProduct.css";
import { useSelector } from "react-redux";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

function CreateProduct() {
  const { categories } = useSelector((state) => state.categories);
  const [image,setImage] = useState({});
  const onFinishForm = (values) => {
    // let nameCate = {};
    // categories.forEach((item) => {
    //   if (item._id === values.category) {
    //     nameCate = item.nameCategory
    //   }
    // });
    // const a = {...values, nameCategory: nameCate};
  };
  
  const callbackFunction = (childData) =>{
    setImage(childData);
  }
  console.log(image?.response);
  return (
    <div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/products">Products</Breadcrumb.Item>
          <Breadcrumb.Item>Create Product</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="create_header">
        <div className="create_header-title">
          <span>CREATE NEW PRODUCT</span>
        </div>
      </div>
      <div className="create_content">
        <div className="create_upload-img">
          <div className="create_upload-img-title">
            <span>Upload Image:</span>
          </div>
          <div className="create_upload-img-up">
            <UploadImage parentCallback={callbackFunction} />
            <span>Thumbnail</span>
          </div>
          <div className="create_upload-img-up">
            <UploadImage />
            <span>Image 1</span>
          </div>
          <div className="create_upload-img-up">
            <UploadImage />
            <span>Image 2</span>
          </div>
          <div className="create_upload-img-up">
            <UploadImage />
            <span>Image 3</span>
          </div>
          <div className="create_upload-img-up">
            <UploadImage />
            <span>Image 4</span>
          </div>
        </div>
        <div className="create_upload-info">
          <Form
            name="form-create"
            onFinish={onFinishForm}
            {...layout}
            size="middle"
            initialValues={{
              sale: 0,
              status: "Stocking",
            }}
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
            <Form.Item
              label="Category"
              name="category"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select category for product!",
                },
              ]}
            >
              <Select placeholder="Please select a category">
                {categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.nameCategory}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Status" name="status" hasFeedback>
              <Select placeholder="Default: Stocking">
                <Option value="Stocking">Stocking</Option>
                <Option value="OutStocking">OutStocking</Option>
                <Option value="Importing">Importing</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Color"
              name="color"
              hasFeedback
              rules={[
                { required: true, message: "Please select color for product!" },
              ]}
            >
              <Select placeholder="Please select color for product">
                <Option value="yellow">Yellow</Option>
                <Option value="gold">Gold</Option>
                <Option value="red">Red</Option>
                <Option value="blue">Blue</Option>
                <Option value="pink">Pink</Option>
                <Option value="black">Black</Option>
                <Option value="white">White</Option>
                <Option value="orange">Orange</Option>
                <Option value="silver">Silver</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Momory"
              name="memory"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select memory for product!",
                },
              ]}
            >
              <Select placeholder="Please select memory for product">
                <Option value="16">16</Option>
                <Option value="32">32</Option>
                <Option value="64">64</Option>
                <Option value="128">128</Option>
                <Option value="256">256</Option>
                <Option value="512">512</Option>
                <Option value="1024">1024</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please input price product!" },
              ]}
            >
              <Input placeholder="Units in USD" type="number" />
            </Form.Item>
            <Form.Item
              label="Storage"
              name="storage"
              rules={[
                { required: true, message: "Please enter quantity in stock!" },
              ]}
            >
              <Input placeholder="Units" type="number" />
            </Form.Item>
            <Form.Item
              label="Sale"
              name="sale"
              rules={[{ required: true, message: "0% -> 99%", min: 0, max: 2 }]}
            >
              <Input placeholder="10%" type="number" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
