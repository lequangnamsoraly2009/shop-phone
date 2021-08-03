import { Breadcrumb, Col } from "antd";
import React from "react";
import "../page.css";
import "./dashboard.css";
import { HomeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function DashBoard() {
  const { deviceUsers } = useSelector((state) => state.usersAdmin);
  console.log(deviceUsers);
  return (
    <Col className="gutter-row" span={21}>
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
    </Col>
  );
}

export default DashBoard;
