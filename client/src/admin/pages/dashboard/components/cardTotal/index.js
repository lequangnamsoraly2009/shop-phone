import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { BsBag } from 'react-icons/bs';
import { IoCubeOutline,IoApertureOutline } from "react-icons/io5";

function CardTotal() {
  const { deviceUsers } = useSelector((state) => state.usersAdmin);
  const { products } = useSelector((state) => state.products);
  const { payments } = useSelector((state) => state.payments);
  const {categories} = useSelector((state) => state.categories);
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
              prefix={<UserOutlined />}
              suffix=" Users"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ border: "1px solid #aaa" }}>
            <Statistic
              title="Total Products"
              value={products.length}
              valueStyle={{ color: "#cf1322" }}
              prefix={<IoCubeOutline />}
              suffix=" Units"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ border: "1px solid #aaa" }}>
            <Statistic
              title="Total Orders"
              value={payments.length}
              //   precision={2}
              prefix={<BsBag />}
              valueStyle={{ color: "#cf1322" }}
              suffix=" Payments"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ border: "1px solid #aaa" }}>
            <Statistic
              title="Total Categories "
              value={categories.length}
              prefix={<IoApertureOutline />}
              valueStyle={{ color: "#cf1322" }}
              suffix=" Categories"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CardTotal;
