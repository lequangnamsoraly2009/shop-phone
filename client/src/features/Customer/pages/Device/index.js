import React, { useState } from "react";
import { Breadcrumb, Row, Col, Menu } from "antd";
import DeviceUser from "../../components/deviceUser";
import BrowserUser from "../../components/browserUser";

function Device() {
  const [showInformation, setShowInformation] = useState(true);

  const handleClickShowBrowser = () => {
    setShowInformation(false);
  };
  const handleClickShowDevice = () => {
    setShowInformation(true);
  };

  return (
    <div className="container-fluid">
      <div className="breadcumb-wrapper">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
            Information Current Device
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row gutter={{ xs: 4, sm: 8, md: 8, lg: 12 }}>
        <Col className="gutter-row" span={6}>
          <div className="infor-menu">
            <Menu
              style={{ width: "100%" }}
              defaultSelectedKeys={["1"]}
              // defaultOpenKeys={["sub1"]}
              mode="inline"
            >
              <Menu.Item key="1" onClick={handleClickShowDevice}>
                Information Device
              </Menu.Item>
              <Menu.Item key="2" onClick={handleClickShowBrowser}>
                Information Browser
              </Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col className="gutter-row" span={18}>
          {showInformation === true ? <DeviceUser /> : <BrowserUser />}
        </Col>
      </Row>
    </div>
  );
}

export default Device;
