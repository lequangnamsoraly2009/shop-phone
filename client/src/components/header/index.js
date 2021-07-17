import { Anchor, Badge, Button, Drawer, Dropdown, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import "./header.css";
import React, { useState } from "react";
import { Input } from "antd";
import {
  AudioOutlined,
  SkinOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  DownOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "antd/lib/avatar/avatar";
import API from "../../api/axiosClient";
import { getLogout } from "../../app/userSlice";
import { persistor } from "../../app/store";
import Swal from "sweetalert2";
import { removeToken } from "../../app/tokenSlice";

const { Search } = Input;
// const { Link } = Anchor;

function HeaderNav() {
  const [visible, setVisible] = useState(false);
  // const token = useSelector(state=> state.token)
  // console.log(token)

  const { isLoggedIn, isBuyer, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  // Logout
  const onClickLogout = async (e) => {
    e.preventDefault();
    try {
      await API.get("/users/logout");
      persistor.purge("persist:root");

      localStorage.removeItem("firstLogin");
      localStorage.removeItem("persist:root");

      dispatch(getLogout());
      dispatch(removeToken());
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Good bye! See you soon! 😭",
        text: "You have logged out successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      alert(error.message);
    }
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

  const menu = (
    <Menu style={{ width: 200, left: -50 }}>
      <Menu.Item key="0">
        <a href="/category/iphone">Iphone</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/category/samsung">SamSung</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="/category/nokia">Nokia</a>
      </Menu.Item>
      <Menu.Item key="4">
        <a href="/category/vsmart">VsMart</a>
      </Menu.Item>
      <Menu.Item key="5">
        <a href="/category/xiaomi">Xiaomi</a>
      </Menu.Item>
      <Menu.Item key="6">
        <a href="/category/oppo">OPPO</a>
      </Menu.Item>
      <Menu.Item key="7">
        <a href="/category/vivo">Vivo</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: "#fff", padding: 0 }}>
      <div className="container-fluid header-wrapper">
        <div className="header">
          <div className="logo">
            <a
              href="/"
              className="mobileHidden"
              style={{ color: "#000", fontWeight: 500 }}
            >
              <SkinOutlined style={{ fontSize: 40, margin: "auto" }} />
              SORALY
            </a>
            <a
              href="/"
              className="mobileVisible"
              style={{ color: "#000", fontWeight: 500, fontSize: 25 }}
            >
              <SkinOutlined
                className="mobileHidden"
                style={{ fontSize: 40, margin: "auto" }}
              />
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
          <Search
            className="mobileVisible"
            style={{ maxWidth: "60%", padding: "0 5px" }}
            placeholder="Search"
            // enterButton="Search"
            // size="large"
            // suffix={suffix}
            onSearch={onSearch}
          />
          <div className="mobileHidden">
            <Menu theme="light" mode="horizontal" className="header_menu">
              {!isLoggedIn && !isBuyer ? (
                <>
                  <Menu.Item key="login">
                    <a href="/buyer/login">Login</a>
                  </Menu.Item>
                  <Menu.Item key="register">
                    <a href="/buyer/register">Register</a>
                  </Menu.Item>
                </>
              ) : (
                <div className="user_infor">
                  <Menu.Item key="user">
                    <Avatar
                      style={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                        textTransform: "capitalize",
                        marginRight: 5,
                      }}
                    >
                      U
                    </Avatar>
                    <a
                      href="/buyer/user"
                      style={{ textTransform: "capitalize" }}
                    >
                      {user.userName}
                    </a>
                  </Menu.Item>
                  <div className="user_dropdown">
                    <div className="user-dropdown-title">
                      <a href="/">Your Information</a>
                      <a href="/" onClick={onClickLogout}>
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              )}
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
              <Anchor targetOffset="300" bounds="5" onClick={onClickLogout}>
                <div className="anchor-wrap">
                  <a href="/" className="button-logout">
                    Home Page
                  </a>{" "}
                  <a href="/buyer/infor" className="button-logout">
                    Your Information
                  </a>{" "}
                  <a href="/cart" className="button-logout">
                    Cart
                  </a>
                </div>
                <Menu
                  // onClick={handleClick}
                  style={{
                    width: "100%",
                    borderBottom: "1px solid rgba(221, 219, 219, 0.678)",
                  }}
                  mode="inline"
                >
                  <SubMenu
                    key="sub1"
                    style={{
                      paddingLeft: 0,
                      fontSize: 16,
                      color: "#222",
                      fontWeight: 400,
                    }}
                    title="Category"
                  >
                    <Menu.Item key="1">
                      <a href="/category/iphone">Iphone</a>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <a href="/category/samsung">SamSung</a>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <a href="/category/nokia">Nokia</a>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <a href="/category/vsmart">VsMart</a>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <a href="/category/xiaomi">Xiaomi</a>
                    </Menu.Item>
                    <Menu.Item key="6">
                      <a href="/category/oppo">OPPO</a>
                    </Menu.Item>
                    <Menu.Item key="7">
                      <a href="/category/vivo">Vivo</a>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
                <div className="anchor-wrap">
                  <a href="/contact" className="button-logout">
                    Contact
                  </a>
                </div>
                {isLoggedIn && isBuyer ? (
                  <div className="anchor-wrap">
                    <a
                      href="/"
                      onClick={onClickLogout}
                      className="button-logout"
                    >
                      Logout
                    </a>
                  </div>
                ) : (
                  <div className="anchor-wrap">
                    <a href="/buyer/login" className="button-logout">
                      Login
                    </a>
                    <a href="/buyer/register" className="button-logout">
                      Register
                    </a>
                  </div>
                )}
              </Anchor>
            </Drawer>
          </div>
        </div>
        <div className="nav-category mobileHidden">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/">HOME PAGE</a>
            </li>
            <li className="nav-item">
              <Dropdown overlay={menu} arrow={true}>
                <a className="ant-dropdown-link" href="/category">
                  CATEGORY <DownOutlined />
                </a>
              </Dropdown>
            </li>
            <li className="nav-item">
              <a href="/">CONTACT</a>
            </li>
            <li className="nav-item">
              <a href="/">ABOUT US</a>
            </li>
            <li className="nav-item">
              <a href="/">BLOG</a>
            </li>
            <li className="nav-item">
              <a href="/">GITHUB</a>
            </li>
          </ul>
        </div>
      </div>
    </Header>
  );
}

export default HeaderNav;
