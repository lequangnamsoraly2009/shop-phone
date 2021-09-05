import { Breadcrumb, Tabs } from "antd";
import React from "react";
import "./information.css";
import ChangePass from "../../components/changePass";
import UpdateInfor from "../../components/updateInfor";
import ChangeAvatar from "../../components/changeAvatar";

const { TabPane } = Tabs;

function InformationCustomer() {
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
            <ChangeAvatar />
          </TabPane>
          <TabPane tab="Change Password" key="3">
            <ChangePass />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default InformationCustomer;
