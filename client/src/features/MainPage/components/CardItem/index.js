import { Card } from "antd";
import { Meta } from "antd/lib/list/Item";
import React from "react";
import "./cardItem.css";
import { useHistory } from "react-router-dom";

function CardItem({ product }) {
  const history = useHistory();

  const onClickDetails = () => {
    history.push(`details/${product?._id}`);
  };
  return (
    <Card
      hoverable
      cover={
        <img
          style={{ paddingTop: 20 }}
          alt={product?.description}
          src={product?.images.url}
        />
      }
      onClick={onClickDetails}
    >
      <div className="sale-firstShop">
        <img
          src="https://cdn.tgdd.vn/2020/10/content/icon1-50x50.png"
          alt="sale"
        />
        <span>BRAND OPENING SALE </span>
      </div>
      <Meta
        title={product?.title}
        style={{ margin: "0px 5px", textTransform: "capitalize" }}
      />
      <div className="price-down">
        <p
          style={{
            margin: 5,
            textDecoration: "line-through",
            fontWeight: 300,
          }}
        >
          {product?.price} $
        </p>

        <span style={{ margin: "auto 0", fontWeight: 300 }}>-10%</span>
      </div>
      <p style={{ margin: "0px 5px", fontWeight: 800 }}>
        {product?.price - (product?.price * 10) / 100} $
      </p>
    </Card>
  );
}

export default CardItem;
