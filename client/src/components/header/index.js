import {
  Anchor,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Menu,
  Avatar,
  Image,
} from "antd";
import { Header } from "antd/lib/layout/layout";
import "./header.css";
import React, { useEffect, useState } from "react";
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
// import Avatar from "antd/lib/avatar/avatar";
import API from "../../api/axiosClient";
import { getLogout, getUserLogin } from "../../app/userSlice";
import { persistor } from "../../app/store";
import Swal from "sweetalert2";
import { removeToken } from "../../app/tokenSlice";
import {
  getCartUser,
  removeAddressTemp,
  removeCart,
  // removeCartPayMentTemp,
} from "../../app/cartSlice";
import { Link, useHistory } from "react-router-dom";
import {
  getAllProductsFilter,
  setCategoryFilter,
  setPageFilter,
  setSearchFilter,
  setSortFilter,
} from "../../app/productSlice";
import { GoogleLogout } from "react-google-login";
import { setSearch } from "../../app/searchSlice";

const { Search } = Input;

function HeaderNav() {
  const [visible, setVisible] = useState(false);

  const { isLoggedIn, isBuyer, user } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.carts);
  const { token } = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (token) {
      dispatch(getUserLogin(token));
      dispatch(getCartUser(token));
    }
  }, [token, dispatch]);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  // Logout GoogleLogout
  const onClickLogoutGoogle = async () => {
    try {
      await API.get("/users/logout");
      persistor.purge("persist:root");

      localStorage.removeItem("firstLogin");
      localStorage.removeItem("persist:root");

      dispatch(getLogout());
      dispatch(removeToken());
      dispatch(removeCart());
      // dispatch(removeCartPayMentTemp());
      dispatch(removeAddressTemp());
    } catch (error) {
      alert(error.message);
    }
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
      dispatch(removeCart());
      // dispatch(removeCartPayMentTemp());
      dispatch(removeAddressTemp());
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

  const onSearch = (value) => {
    history.push("/category");
    dispatch(setSearch(value.toLowerCase()));
    dispatch(setSearchFilter(value.toLowerCase()));
    dispatch(setCategoryFilter(""));
    dispatch(setPageFilter(1));
    dispatch(setSortFilter(""));
  };

  const onClickGetAll = () => {
    dispatch(setSearchFilter(""));
    dispatch(setCategoryFilter(""));
    dispatch(setPageFilter(1));
    dispatch(setSortFilter(""));
  };

  const onClickSearchCategory = (cateID) => {
    dispatch(setCategoryFilter(`category=${cateID}`));
    dispatch(
      getAllProductsFilter({
        categoryFilter: `category=${cateID}`,
        sortFilter: "",
        searchFilter: "",
        pageFilter: 1,
      })
    );
  };

  const menu = (
    <Menu style={{ width: 200, left: -50 }}>
      <Menu.Item key="0">
        <Link
          to="/category"
          onClick={() => onClickSearchCategory("60fda6f142896d2fbb6d9ae4")}
        >
          Iphone
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link
          to="/category"
          onClick={() => onClickSearchCategory("60fda6f542896d2fbb6d9ae7")}
        >
          SamSung
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link
          to="/category"
          onClick={() => onClickSearchCategory("60fda71642896d2fbb6d9af0")}
        >
          Nokia
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link
          to="/category"
          onClick={() => onClickSearchCategory("60fda70b42896d2fbb6d9aed")}
        >
          VsMart
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link
          to="/category"
          onClick={() => onClickSearchCategory("60fda72342896d2fbb6d9af6")}
        >
          Xiaomi
        </Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link
          to="/category"
          onClick={() => onClickSearchCategory("60fda70442896d2fbb6d9aea")}
        >
          OPPO
        </Link>
      </Menu.Item>
      <Menu.Item key="7">
        <Link
          to="/category"
          onClick={() => onClickSearchCategory("60fda71d42896d2fbb6d9af3")}
        >
          Vivo
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="header-public"
      style={{ background: "#fff", padding: 0 }}
    >
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
            allowClear
            onSearch={onSearch}
          />
          <Search
            className="mobileVisible"
            style={{ maxWidth: "60%", padding: "0 5px" }}
            placeholder="Search"
            // enterButton="Search"
            // size="large"
            // suffix={suffix}
            allowClear
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
                    {user.avatar ? (
                      <Avatar
                        style={{
                          color: "#f56a00",
                          backgroundColor: "#fde3cf",
                          textTransform: "capitalize",
                          marginRight: 5,
                          border: "1px solid rgba(77, 77, 77, 0.3)",
                        }}
                        src={
                          <Image src={user.avatar.url} />
                        }
                      />
                    ) : (
                      <Avatar
                        style={{
                          color: "#f56a00",
                          backgroundColor: "#fde3cf",
                          textTransform: "capitalize",
                          marginRight: 5,
                          border: "1px solid rgba(77, 77, 77, 0.3)",
                        }}
                        src={
                          <Image src="https://i.pinimg.com/474x/a7/b0/5e/a7b05eed960c1c288f05012082008f03.jpg" />
                        }
                      />
                    )}
                    <a
                      href="/customer/infor"
                      style={{ textTransform: "capitalize" }}
                    >
                      {user.userName}
                    </a>
                  </Menu.Item>
                  <div className="user_dropdown">
                    <div className="user-dropdown-title">
                      <a href="/customer/infor">Your Information</a>
                      <a href="/customer/voucher">Your Voucher</a>
                      <a href="/customer/history">History Order</a>
                      <a href="/customer/device">Current Device</a>
                      {user.methodLogin === 1 ? (
                        <a href="/" onClick={onClickLogout}>
                          Logout
                        </a>
                      ) : (
                        <GoogleLogout
                          clientId="191429477921-djsmrc5pi7mig0q7b609idkaqmiqi55f.apps.googleusercontent.com"
                          // buttonText="Logout"
                          render={(renderProps) => (
                            <a
                              href="/"
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                            >
                              Logout
                            </a>
                          )}
                          onLogoutSuccess={onClickLogoutGoogle}
                        ></GoogleLogout>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <Menu.Item key="cart" className="cart_icon">
                <Link to="/home/cart">
                  <Badge
                    className="badge-count"
                    count={carts.length}
                    overflowCount={9}
                  />
                  <ShoppingCartOutlined style={{ fontSize: 25 }} />
                </Link>
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
                  <a href="/customer/infor" className="button-logout">
                    Your Information
                  </a>{" "}
                  <a href="/customer/history" className="button-logout">
                    History Order
                  </a>{" "}
                  <a href="/home/cart" className="button-logout">
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
                      <a href="/category">Iphone</a>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <a href="/category">SamSung</a>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <a href="/category">Nokia</a>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <a href="/category">VsMart</a>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <a href="/category">Xiaomi</a>
                    </Menu.Item>
                    <Menu.Item key="6">
                      <a href="/category">OPPO</a>
                    </Menu.Item>
                    <Menu.Item key="7">
                      <a href="/category">Vivo</a>
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
                <Link
                  className="ant-dropdown-link"
                  to="/category"
                  onClick={onClickGetAll}
                >
                  CATEGORY <DownOutlined />
                </Link>
              </Dropdown>
            </li>
            <li className="nav-item">
              <a href="/voucher">VOUCHER</a>
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
              <a
                href="https://github.com/lequangnamsoraly2009"
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Header>
  );
}

export default HeaderNav;
