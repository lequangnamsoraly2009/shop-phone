import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";
import UploadImage from "../uploadImage";
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
        <div className="create-header-title">
          <span>CREATE NEW PRODUCT</span>
        </div>
      </div>
      <div className="create-content">
        <div className="create-upload-img">
            <span>Upload Image</span>
            <UploadImage />
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
