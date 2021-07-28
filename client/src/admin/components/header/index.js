import {
  NotificationOutlined,
  SettingOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import { Badge, Avatar } from "antd";
import { Header } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import React from "react";
import "./header.css";
import UserAPI from "../../../api/userAPI";
import ProductAPI from "../../../api/productAPI";
import CategoryAPI from "../../../api/categoryAPI";
import ProductFilterAPI from "../../../api/filterAPI";


function HeaderAdmin() {
  UserAPI();
  ProductAPI();
  CategoryAPI();
  ProductFilterAPI();
  
  return (
    <Header className="header_admin">
      <div className="header_wrapper container-fluid">
        <div className="header_logo">
          <a
            href="/home"
            className="mobileHidden"
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
            <Avatar
              style={{ cursor: "pointer" }}
              src="https://i.pinimg.com/originals/1e/56/93/1e56935ed2360bde6ffc4b12bb2ec461.jpg"
            />
          </div>
        </div>
      </div>
    </Header>
  );
}

export default HeaderAdmin;
