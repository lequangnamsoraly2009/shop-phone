import React from "react";
import { Row, Col } from "antd";
import CardItem from "../CardItem";
import "./phonesold.css";
import { useSelector } from "react-redux";

function PhoneSold() {
  const listProducts = useSelector((state) => state.products.products);
  // console.log(listProducts)
  // const newList = listProducts.slice(0,3);
  // console.log(newList)
  return (
    <section className="soraly-section-3">
      <div className="title-global">
        <h2>BEST SELLING 2021</h2>
      </div>
      <div className="site-phone-sold">
        <Row gutter={[8, 12]}>
          {listProducts.map((product) => {
            return (
              <Col key={product._id} className="gutter-row" span={6}>
                <CardItem product={product} />
              </Col>
            );
          })}
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
