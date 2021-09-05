import { Breadcrumb, Row, Col, Tabs } from "antd";
import React, { useState } from "react";
import "./information.css";
import ChangePass from "../../components/changePass";
import UpdateInfor from "../../components/updateInfor";

const { TabPane } = Tabs;

function InformationCustomer() {
  // const [showInformation, setShowInformation] = useState(true);

  // const handleClickShowPass = () => {
  //   setShowInformation(false);
  // };
  // const handleClickShowInfor = () => {
  //   setShowInformation(true);
  // };

  // const handleClickChangeAvater = () => {

  // }

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
      <div className="infor-menu">
        <Tabs tabPosition="left">
          <TabPane tab="Information" key="1">
            <UpdateInfor />
          </TabPane>
          <TabPane tab="Change Avatar" key="2">
            Change Avatar
          </TabPane>
          <TabPane tab="Change Password" key="3">
            <ChangePass />
          </TabPane>
        </Tabs>
        {/* <Menu
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
              <Menu.Item key="3" onClick={handleClickChangeAvater}>
                Change Avatar
              </Menu.Item>
            </Menu> */}
      </div>
    </div>
  );
}

export default InformationCustomer;
