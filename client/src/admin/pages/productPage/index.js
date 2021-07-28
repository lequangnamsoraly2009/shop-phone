import { Breadcrumb } from "antd";
import React from "react";
import "./product.css";
import { HomeOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";

const { Search } = Input;

function ProductPage() {
  const onSearch = (values) => {
    console.log(values);
  };
  return (
    <div>
      <div className="header_page">
        <h3>Products</h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Products</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="product_data">
        <div className="product_data-header">
          <h3>Data Table Products</h3>
        </div>
        <div className="product_data-top">
          <div className="product_data-search">
            <Search
              placeholder="Search Product"
              allowClear
              enterButton="Search"
              size="middle"
              onSearch={onSearch}
            />
          </div>
          <div className="product_data-create">
            <Button type="primary">Create Product</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
