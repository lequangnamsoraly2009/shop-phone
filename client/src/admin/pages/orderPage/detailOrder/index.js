import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

function DetailOrder() {
  const history = useHistory();

  const backPreviousPage = (e) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <div className="container-admin">
      <div className="header_page">
        <h3>
          <Button style={{marginRight: 10}} type="dashed" icon={<ArrowLeftOutlined />} onClick={backPreviousPage} />Orders From Customers
        </h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/orders">Orders</Breadcrumb.Item>
          <Breadcrumb.Item>Detail Orders</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="product_data"></div>
    </div>
  );
}

export default DetailOrder;
