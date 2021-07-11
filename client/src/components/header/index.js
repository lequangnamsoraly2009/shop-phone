import { Anchor, Badge, Button, Drawer, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import "./header.css";
import React, { useState } from "react";
import { Input } from "antd";
import {
  AudioOutlined,
  SkinOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
const { Search } = Input;
const { Link } = Anchor;

function HeaderNav() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  const onSearch = (value) => console.log(value);

  return (
    <Header style={{ background: "#fff", padding: 0 }}>
      <div className="container-fluid">
        <div className="header">
          <div className="logo">
            <a href="/" style={{ color: "#000", fontWeight: 500 }}>
              <SkinOutlined style={{ fontSize: 40, margin: "auto" }} />
              SORALY
            </a>
          </div>

          <Search
            className="mobileHidden"
            style={{ width: "35%" }}
            placeholder="Search"
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
          />
          <div className="mobileHidden">
            <Menu theme="light" mode="horizontal" className="header_menu">
              <Menu.Item key="login">
                <a href="/buyer/login">Login</a>
              </Menu.Item>
              <Menu.Item key="register">
                <a href="/buyer/register">Register</a>
              </Menu.Item>
              <Menu.Item key="cart" className="cart_icon">
                <a href="/cart">
                  <Badge className="badge-count" count={10} overflowCount={9} />
                  <ShoppingCartOutlined style={{ fontSize: 25 }} />
                </a>
              </Menu.Item>
            </Menu>
          </div>
          <div className="mobileVisible">
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <Drawer
              placement="right"
              closable={false}
              onClose={onClose}
              visible={visible}
              width="75%"
              maskClosable={true}
            >
              <Anchor targetOffset="300" bounds="5">
                <Link href="/" title="Home Page" />
                <Link href="/buyer/infor" title="Your Information" />
                <Menu
                  // onClick={handleClick}
                  style={{ width: 256, borderBottom: "1px solid rgba(221, 219, 219, 0.678)"}}
                  mode="inline"
                >
                  <SubMenu key="sub1" style={{paddingLeft: 0, fontSize: 16, color: "#222", fontWeight: 400}} title="Navigation One">
                      <Menu.Item key="1"><a href="/category/ios">Ios</a></Menu.Item>
                      <Menu.Item key="2"><a href="/category/android">Android</a></Menu.Item>
                      <Menu.Item key="3"><a href="/category/different">Different</a></Menu.Item>                      
                  </SubMenu>
                </Menu>
                <Link href="/cart" title="Cart" />
                <Link href="/buyer/login" title="Login" />
                <Link href="/buyer/register" title="Register" />
                <Link href="/contact" title="Contact" />
              </Anchor>
            </Drawer>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default HeaderNav;
