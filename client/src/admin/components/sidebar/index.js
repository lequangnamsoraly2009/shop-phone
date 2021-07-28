import { Col, Menu } from "antd";
import React from "react";
import {
    DesktopOutlined,
  HomeOutlined,
} from "@ant-design/icons";

function SideBar() {
  return (
    <Col className="gutter-row" span={4}>
      <Menu
        // onClick={this.handleClick}
        style={{ width: "100%" }}
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="light"
      >
          <Menu.ItemGroup key="g1" title="MAIN">
        <Menu.Item icon={<HomeOutlined />} key="1">Home</Menu.Item>
        <Menu.Item icon={<DesktopOutlined />} key="2">Products</Menu.Item>
        <Menu.Item icon={<HomeOutlined />} key="3">Categories</Menu.Item>
        <Menu.Item icon={<HomeOutlined />} key="4">Orders</Menu.Item>
        <Menu.Item icon={<HomeOutlined />} key="5">Users</Menu.Item>
        <Menu.Item icon={<HomeOutlined />} key="6">Information Admin</Menu.Item>
        <Menu.Item icon={<HomeOutlined />} key="7">Notification</Menu.Item>
        <Menu.Item icon={<HomeOutlined />} key="8">Setting</Menu.Item>
        <Menu.Item icon={<HomeOutlined />} key="9">Discount</Menu.Item>
        <Menu.Item icon={<HomeOutlined />} key="10">Contact</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="EXTRA">
        <Menu.Item icon={<HomeOutlined />} key="12">GitHub</Menu.Item>
        <Menu.Item icon={<HomeOutlined />} key="13">About</Menu.Item>
        <Menu.Item icon={<HomeOutlined />} key="14">Help</Menu.Item>
          </Menu.ItemGroup>
      </Menu>
    </Col>
  );
}

export default SideBar;
