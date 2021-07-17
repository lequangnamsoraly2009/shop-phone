import React from "react";
import { Breadcrumb, Rate } from "antd";
import "./detailProduct.css";

function DetailProduct() {
  return (
    <div className="container-fluid">
      <div className="breadcumb-wrapper">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="">Iphone</Breadcrumb.Item>
          <Breadcrumb.Item>Iphone 11</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="main-product">
        <div className="left-product">
            
        </div>
        <div className="right-product">
            
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
