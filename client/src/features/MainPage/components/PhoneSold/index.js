import React from "react";
import { Row, Col } from "antd";
import CardItem from "../CardItem";
import "./phonesold.css";

function PhoneSold() {
  return (
    <section className="soraly-section-3">
      <div className="title-global">
        <h2>BEST SELLING 2021</h2>
      </div>
      <div className="site-phone-sold">
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={6}>
            <CardItem />
          </Col>
          <Col className="gutter-row" span={6}>
            <CardItem />
          </Col>
          <Col className="gutter-row" span={6}>
            <CardItem />
          </Col>
          <Col className="gutter-row" span={6}>
            <CardItem />
          </Col>
          <Col className="gutter-row" span={6}>
            <CardItem />
          </Col>
          <Col className="gutter-row" span={6}>
            <CardItem />
          </Col>
          <Col className="gutter-row" span={6}>
            <CardItem />
          </Col>
          <Col className="gutter-row" span={6}>
            <CardItem />
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

export default PhoneSold;
