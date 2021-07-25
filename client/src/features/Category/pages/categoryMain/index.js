import { Col, Row, Menu } from "antd";
import React from "react";
import {
  AppstoreOutlined,
  FilterOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
// import { Link } from "react-router-dom";
import "./categorymain.css";
import ListItem from "../../components/listItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryFilter,
  setPageFilter,
  setSearchFilter,
  setSortFilter,
} from "../../../../app/filterSlice";
import ProductFilterAPI from "../../../../api/filterAPI";

const { SubMenu } = Menu;

function Category() {
  
  const dispatch = useDispatch();

  ProductFilterAPI();
  

  const handleClickAll = () => {
    dispatch(setCategoryFilter(""));
    dispatch(setSortFilter(""));
    dispatch(setSearchFilter("samsung"));
    dispatch(setPageFilter(1));
  };

  return (
    <div className="container-fluid">
      <Row gutter={{ xs: 4, sm: 8, md: 8, lg: 12 }}>
        <Col className="gutter-row" span={4}>
          <div className="category">
            <div className="category-wrapper">
              <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["smart-phone"]}
                mode="inline"
                theme="white"
              >
                <Menu.Item
                  
                  style={{ padding: 0 }}
                  key="1"
                  icon={<AppstoreOutlined spin />}
                >
                  <span>All Category</span>
                </Menu.Item>
                <SubMenu
                  key="smart-phone"
                  icon={<PhoneOutlined spin />}
                  title="Smart Phone"
                  //   style={{padding: 0}}
                >
                  <Menu.Item onClick={() => handleClickAll()} key="2">
                    <span>iPhone</span>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <span>SamSung</span>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <span>Oppo</span>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <span>VsMart</span>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <span>Nokia</span>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <span>Vivo</span>
                  </Menu.Item>
                  <Menu.Item key="9">
                    <span>Xiaomi</span>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <span>OnePlus</span>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="brick-phone"
                  icon={<PhoneOutlined spin />}
                  title="Brick Phone"
                >
                  <Menu.Item key="11">
                    <span>Nokia</span>
                  </Menu.Item>
                  <Menu.Item key="12">
                    <span>Mobell</span>
                  </Menu.Item>
                  <Menu.Item key="13">
                    <span>iTel</span>
                  </Menu.Item>
                  <Menu.Item key="14">
                    <span>Masstel</span>
                  </Menu.Item>
                  <Menu.Item key="15">
                    <span>Vertu</span>
                  </Menu.Item>
                </SubMenu>
              </Menu>
              <div className="category-filter">
                <div className="category-header">
                  <span style={{ fontSize: 16, fontWeight: 800 }}>
                    <FilterOutlined style={{ marginRight: 10 }} />
                    FILTERS
                  </span>
                </div>
                <div className="category-price">
                  <span>Price</span>
                  <span>Price</span>
                  <span>Price</span>
                  <span>Price</span>
                  <span>Price</span>
                  <span>Price</span>
                  <span>Price</span>
                  <span>Price</span>
                  <span>Price</span>
                  <span>Price</span>
                  <span>Price</span>
                  <span>Price</span>
                  <span>Price</span>
                  <span>Price</span>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={20}>
          <div>
            <ListItem />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Category;
