import { Col, Row } from "antd";
import React from "react";
import CardItem from "../CardItem";

function Iphone() {
  return (
    <section className="soraly-section-5">
      <div className="banner-brands">
        <img
          src="https://cdn.cellphones.com.vn/media/wysiwyg/new-HP_DESKTOP_COVID.png"
          alt="banner"
        />
      </div>
      <div className="title-global">
        <h2>IPHONE</h2>
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

export default Iphone;
