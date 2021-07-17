import { Card } from "antd";
import { Meta } from "antd/lib/list/Item";
import React from "react";
import "./cardItem.css";

function CardItem() {
  return (
    <>
        <Card
          hoverable
          cover={
            <img
              style={{ paddingTop: 20 }}
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <div className="sale-firstShop">
            <img src="https://cdn.tgdd.vn/2020/10/content/icon1-50x50.png" alt="sale" />
            <span>BRAND OPENING SALE </span>
          </div>
          <Meta title="Iphone 11 64GB" style={{ margin: "0px 5px" }} />
          <div className="price-down">
            <p
              style={{
                margin: 5,
                textDecoration: "line-through",
                fontWeight: 300,
              }}
            >
              700$
            </p>

            <span style={{ margin: "auto 0", fontWeight: 300 }}>-10%</span>
          </div>
          <p style={{ margin: "0px 5px", fontWeight: 800 }}>630$</p>
        </Card>
    </>
  );
}

export default CardItem;
