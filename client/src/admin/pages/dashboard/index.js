import { Breadcrumb } from "antd";
import React from "react";
import "../page.css";
import "./dashboard.css";
import { HomeOutlined } from "@ant-design/icons";

function DashBoard() {
  return (
    <div>
      <div className="header_page">
        <h3>Home</h3>
      </div>
      <div className="home_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
}

export default DashBoard;
