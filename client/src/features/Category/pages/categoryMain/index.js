import { Col, Row, Menu } from "antd";
import React, { useEffect } from "react";
import {
  AppstoreOutlined,
  FilterOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
// import { Link } from "react-router-dom";
import "./categorymain.css";
import ListItem from "../../components/listItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setCategoryFilter,
  setPageFilter,
  setSearchFilter,
  setSortFilter,
} from "../../../../app/filterSlice";
import { getAllCategories } from "../../../../app/categorySlice";

const { SubMenu } = Menu;

function Category() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories(""));
  }, [dispatch]);

  const handleClickCategory = (cateID) => {
    dispatch(setCategoryFilter(`category=${cateID}`));
    dispatch(setSearchFilter(""));
    dispatch(setPageFilter(1));
    dispatch(setSortFilter(""));
  };

  const handleClickGetAll = () => {
    dispatch(setCategoryFilter(""));
    dispatch(setSearchFilter(""));
    dispatch(setPageFilter(1));
    dispatch(setSortFilter(""));
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
                  onClick={() => handleClickGetAll()}
                >
                  <span>All Category</span>
                </Menu.Item>
                <SubMenu
                  key="smart-phone"
                  icon={<PhoneOutlined spin />}
                  title="List Categories"
                  //   style={{padding: 0}}
                >
                  {categories.map((cate) => {
                    return (
                      <Menu.Item
                        key={cate._id}
                        onClick={() => handleClickCategory(cate._id)}
                      >
                        <span>{cate.nameCategory}</span>
                      </Menu.Item>
                    );
                  })}
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
