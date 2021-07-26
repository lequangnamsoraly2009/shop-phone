import {
  Breadcrumb,
  Row,
  Col,
  Menu,
} from "antd";
import React, { useState } from "react";
import "./information.css";
import ChangePass from "../../components/changePass";
import UpdateInfor from "../../components/updateInfor";

function InformationCustomer() {
  const [showInformation, setShowInformation] = useState(true);
  

  const handleClickShowPass = () => {
    setShowInformation(false);
  };
  const handleClickShowInfor = () => {
    setShowInformation(true);
  };

  return (
    <div className="container-fluid">
      <div className="breadcumb-wrapper">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
            account information
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row gutter={{ xs: 4, sm: 8, md: 8, lg: 12 }}>
        <Col className="gutter-row" span={4}>
          <div className="infor-menu">
            <Menu
              style={{ width: "100%" }}
              defaultSelectedKeys={["1"]}
              // defaultOpenKeys={["sub1"]}
              mode="inline"
            >
              <Menu.Item key="1" onClick={handleClickShowInfor}>
                Information
              </Menu.Item>
              <Menu.Item key="2" onClick={handleClickShowPass}>
                Change Password
              </Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col className="gutter-row" span={20}>
          {showInformation === true ? (
            <UpdateInfor />
          ) : (
            <ChangePass />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default InformationCustomer;
