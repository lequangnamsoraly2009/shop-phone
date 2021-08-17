import { Col, Menu } from "antd";
import React from "react";
import {
  CoffeeOutlined,
  DashboardOutlined,
  DesktopOutlined,
  ExclamationCircleOutlined,
  ExperimentOutlined,
  GithubOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  StarOutlined,
  TransactionOutlined,
  UsergroupAddOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsFilter } from "../../../app/productSlice";
import { getAllCategories } from "../../../app/categorySlice";
import { setSearchUsers } from "../../../app/userSlice.admin";
import { getAllPayments } from "../../../app/paymentSlice";

function SideBar() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);

  return (
    <Col className="gutter-row" span={3}>
      <Menu
        style={{ width: "100%" }}
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="light"
      >
        <Menu.ItemGroup key="g1" title="MAIN">
          <Menu.Item icon={<HomeOutlined />} key="1">
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<DesktopOutlined />} key="2">
            <Link
              onClick={() =>
                dispatch(
                  getAllProductsFilter({
                    categoryFilter: "",
                    sortFilter: "",
                    searchFilter: "",
                    pageFilter: 1,
                  })
                )
              }
              to="/admin/products"
            >
              Products
            </Link>
          </Menu.Item>
          <Menu.Item icon={<CoffeeOutlined />} key="3">
            <Link
              onClick={() => dispatch(getAllCategories(""))}
              to="/admin/categories"
            >
              Categories
            </Link>
          </Menu.Item>
          <Menu.Item icon={<DashboardOutlined />} key="4">
            <Link
              onClick={() =>
                dispatch(getAllPayments({ searchPayments: "", token }))
              }
              to="/admin/orders"
            >
              Orders
            </Link>
          </Menu.Item>
          <Menu.Item icon={<UsergroupAddOutlined />} key="5">
            <Link to="/admin/users" onClick={()=> setSearchUsers("")}>
              Users
            </Link>
          </Menu.Item>
          <Menu.Item icon={<StarOutlined />} key="6">
            <Link to="/admin/information">Information</Link>
          </Menu.Item>
          <Menu.Item icon={<ExperimentOutlined />} key="7">
            <Link to="/admin/chat">Message</Link>
          </Menu.Item>
          <Menu.Item icon={<SettingOutlined />} key="8">
            <Link to="/admin/setting">Setting</Link>
          </Menu.Item>
          <Menu.Item icon={<TransactionOutlined />} key="9">
            <Link to="/admin/question-product">Question Product</Link>
          </Menu.Item>
          <Menu.Item icon={<WhatsAppOutlined />} key="10">
            <Link to="/admin/contact">Contact</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="EXTRA">
          <Menu.Item icon={<GithubOutlined />} key="12">
            <a href="https://github.com/lequangnamsoraly2009">GitHub</a>
          </Menu.Item>
          <Menu.Item icon={<QuestionCircleOutlined />} key="13">
            <Link to="/admin/about">About</Link>
          </Menu.Item>
          <Menu.Item icon={<ExclamationCircleOutlined />} key="14">
            <Link to="/admin/help">Help</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Col>
  );
}

export default SideBar;
