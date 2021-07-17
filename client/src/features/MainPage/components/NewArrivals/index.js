import React from "react";
import { Row, Col } from "antd";
import "./NewArrivals.css";
import CardItem from "../CardItem";

function NewArrivals() {
  return (
    <section className="soraly-section-2">
      <div className="banner-adv">
        <img src="https://cdn.tgdd.vn/2021/07/campaign/Artboard1copy28-1200x120.png" alt="banner" />
      </div>
      <div className="title-global">
        <h2>NEW ARRIVALS</h2>
      </div>
      <div className="site_card-wrapper">
        <Row gutter={[16, 16]}>
          <Col span={6} style={{ height: "auto" }}>
            <a href="/new-arrivals/:id">
              <CardItem />
            </a>
          </Col>
          <Col span={6} style={{ height: "auto" }}>
            <a href="/new-arrivals/:id">
              <CardItem />
            </a>
          </Col>
          <Col span={6} style={{ height: "auto" }}>
            <a href="/new-arrivals/:id">
              <CardItem />
            </a>
          </Col>
          <Col span={6} style={{ height: "auto" }}>
            <a href="/new-arrivals/:id">
              <CardItem />
            </a>
          </Col>
        </Row>
      </div>
      <div style={{ display: "flex" }}>
        <a className="btn" style={{ margin: "20px auto" }} href="/new-arrivals">
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
