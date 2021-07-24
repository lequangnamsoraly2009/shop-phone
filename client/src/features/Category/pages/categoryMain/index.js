import { Col, Row } from "antd";
import React from "react";

function Category() {
  return (
    <div className="container-fluid">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={4}>
          <div>col-4</div>
        </Col>
        <Col className="gutter-row" span={18}>
          <div style={{border: "1px solid #000"}}>col-18</div>
        </Col>
      </Row>
    </div>
  );
}

export default Category;
