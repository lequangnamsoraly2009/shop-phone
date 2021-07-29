import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";
import "./createProduct.css"

function CreateProduct() {
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
      <div className="create-header">
        <div>C</div>
      </div>
      <div className="create-upload">
        <input type="file" name="file" id="file_up" />
      </div>
    </div>
  );
}

export default CreateProduct;
