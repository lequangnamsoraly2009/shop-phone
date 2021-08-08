import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsBag } from "react-icons/bs";
import { IoCubeOutline, IoApertureOutline } from "react-icons/io5";
import { getAllPayments } from "../../../../../app/paymentSlice";
import { getAllCategories } from "../../../../../app/categorySlice";
import { getAllProducts } from "../../../../../app/productSlice";

function CardTotal() {
  const { deviceUsers } = useSelector((state) => state.usersAdmin);
  const { products } = useSelector((state) => state.productsFilter);
  const { payments, searchPayments } = useSelector((state) => state.payments);
  const { categories, searchCategories } = useSelector(
    (state) => state.categories
  );
  const { token } = useSelector((state) => state.token);

  const dispatch = useDispatch();

  // Get data of payments
  useEffect(() => {
    dispatch(getAllPayments({ searchPayments, token }));
  }, [searchPayments, token, dispatch]);

  // Get data of categories
  useEffect(() => {
    dispatch(getAllCategories({ searchCategories }));
  }, [dispatch, searchCategories]);

  // Get data of products
  useEffect(() => {
    dispatch(getAllProducts())
  },[dispatch])

  return (
    <div style={{ margin: "20px 30px" }}>
      <Row gutter={16}>
        <Col span={6}>
          <Card style={{ border: "1px solid #aaa" }}>
            <Statistic
              title="Total Users"
              value={deviceUsers.length}
              //   precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<UserOutlined style={{ marginRight: 5 }} />}
              suffix="Users"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ border: "1px solid #aaa" }}>
            <Statistic
              title="Total Products"
              value={products.length}
              valueStyle={{ color: "#cf1322" }}
              prefix={<IoCubeOutline style={{ marginRight: 5 }} />}
              suffix="Units"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ border: "1px solid #aaa" }}>
            <Statistic
              title="Total Orders"
              value={payments.length}
              //   precision={2}
              prefix={<BsBag style={{ marginRight: 5 }} />}
              valueStyle={{ color: "#cf1322" }}
              suffix="Payments"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ border: "1px solid #aaa" }}>
            <Statistic
              title="Total Categories "
              value={categories.length}
              prefix={<IoApertureOutline style={{ marginRight: 5 }} />}
              valueStyle={{ color: "#cf1322" }}
              suffix="Categories"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CardTotal;
