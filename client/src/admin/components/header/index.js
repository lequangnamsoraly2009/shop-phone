import {
  NotificationOutlined,
  SettingOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import { Badge, Avatar, Dropdown, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { Link, useHistory } from "react-router-dom";
import React from "react";
import "./header.css";
import UserAPI from "../../../api/userAPI";
import ProductAPI from "../../../api/productAPI";
import CategoryAPI from "../../../api/categoryAPI";
import ProductFilterAPI from "../../../api/filterAPI";
import API from "../../../api/axiosClient";
import { persistor } from "../../../app/store";
import { useDispatch} from "react-redux";
import { getLogout } from "../../../app/userSlice";
import { removeToken } from "../../../app/tokenSlice";
import Swal from "sweetalert2";

function HeaderAdmin() {
  UserAPI();
  ProductAPI();
  CategoryAPI();
  ProductFilterAPI();

  const dispatch = useDispatch();
  const history = useHistory();


  // Logout
  const handleClickLogout = async () => {
    try {
      await API.get("/users/logout");
      persistor.purge("persist:root");

      localStorage.removeItem("firstLogin");
      localStorage.removeItem("persist:root");

      dispatch(getLogout());
      dispatch(removeToken());
     
      history.push("/buyer/login");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Good bye 😭",
        text: "You have logged out admin successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops! 😭",
        text: "Something wrongs! Try again!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>Change Theme</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>Change Languages</span>
      </Menu.Item>
      <Menu.Item key="3">
        <span>Change GirlFriend</span>
      </Menu.Item>
      <Menu.Item key="4">
        <span onClick={handleClickLogout}>Log Out</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="header_admin">
      <div className="header_wrapper">
        <div className="header_logo">
          <a
            href="/home"
            // className="mobileHidden"
            style={{ color: "#fff", fontWeight: 500 }}
          >
            <SkinOutlined style={{ fontSize: 40, margin: "auto" }} />
            DASHBOARD
          </a>
        </div>
        <div className="header_nav">
          <Link to="/admin/notification" className="header_nav-notifi">
            <Badge count={1} overflowCount={10}>
              <NotificationOutlined
                style={{ color: "#fff", fontSize: 20, cursor: "pointer" }}
              />
            </Badge>
          </Link>
          <Link to="/admin/setting">
            <div className="header_nav-setting">
              <SettingOutlined
                style={{ color: "#fff", fontSize: 20, cursor: "pointer" }}
              />
            </div>
          </Link>
          <div className="header_nav-avatar">
            <Dropdown overlay={menu}>
              <Avatar
                style={{ cursor: "pointer" }}
                src="https://i.pinimg.com/originals/1e/56/93/1e56935ed2360bde6ffc4b12bb2ec461.jpg"
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default HeaderAdmin;
