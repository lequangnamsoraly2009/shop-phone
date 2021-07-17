import React from "react";
import { Row, Col } from "antd";
import "./NewArrivals.css";
import CardItem from "../CardItem";

function NewArrivals() {
  return (
    <section className="soraly-section-2">
      <div className="title-global">
        <h2>NEW ARRIVALS</h2>
      </div>
      <div className="site_card-wrapper">
        <Row gutter={[16, 16]}>
          <Col span={6} style={{ height: "auto" }}>
            <CardItem />
          </Col>
          <Col span={6} style={{ height: "auto" }}>
            <CardItem />
          </Col>
          <Col span={6} style={{ height: "auto" }}>
            <CardItem />
          </Col>
          <Col span={6} style={{ height: "auto" }}>
            <CardItem />
          </Col>
        </Row>
      </div>
      <div style={{display: "flex"}}>
        <a className="btn" style={{margin: '20px auto'}} href='/'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          See More
        </a>
      </div>
    </section>
  );
}

export default NewArrivals;
