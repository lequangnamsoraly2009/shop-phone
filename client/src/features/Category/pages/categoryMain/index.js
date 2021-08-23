import { Col, Row, Menu } from "antd";
import React, { useEffect } from "react";
import {
  AppstoreOutlined,
  FilterOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import "./categorymain.css";
import ListItem from "../../components/listItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProductsFilter } from "../../../../app/productSlice";
import { getAllCategories } from "../../../../app/categorySlice";

const { SubMenu } = Menu;

function Category() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { search } = useSelector((state) => state.search);
  const { pageFilter, categoryFilter, sortFilter, searchFilter } = useSelector(
    (state) => state.productsFilter
  );

  useEffect(() => {
    dispatch(getAllCategories(""));
    dispatch(
      getAllProductsFilter({
        categoryFilter,
        sortFilter,
        searchFilter,
        pageFilter,
      })
    );
  }, [dispatch, pageFilter, categoryFilter, sortFilter, searchFilter]);

  const handleClickCategory = (cateID) => {
    dispatch(
      getAllProductsFilter({
        categoryFilter: `category=${cateID}`,
        sortFilter: "",
        searchFilter: "",
        pageFilter,
      })
    );
  };

  const handleClickGetAll = () => {
    dispatch(
      getAllProductsFilter({
        categoryFilter: "",
        sortFilter: "",
        searchFilter: "",
        pageFilter,
      })
    );
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
          {search.length > 0 ? (
            <div>
              <span
                style={{ margin: "10px 50px", fontSize: 20, fontWeight: 700 }}
              >
                Search results : {search}
              </span>
            </div>
          ) : (
            ""
          )}
          <div>
            <ListItem />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Category;
