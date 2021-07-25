import { Card } from "antd";
import { Meta } from "antd/lib/list/Item";
import React from "react";
import "./cardItem.css";
import { useHistory } from "react-router-dom";

function CardItem({ product }) {
  const history = useHistory();

  const onClickDetails = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    history.push(`/${product?._id}`);
  };
  return (
    <Card
      hoverable
      style={{height: 430}}
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
        {product?.sale === 0 ? (
          <>
            <p
              style={{
                margin: 5,
                // textDecoration: "line-through",
                fontWeight: 700,
              }}
            >
              {product?.price} $
            </p>
          </>
        ) : (
          <>
            <p
              style={{
                margin: 5,
                textDecoration: "line-through",
                fontWeight: 300,
              }}
            >
              {product?.price} $
            </p>

            <span style={{ margin: "auto 0", fontWeight: 300 }}>
              -{product?.sale}%
            </span>
          </>
        )}
      </div>
      {product?.sale === 0 ? (
        ""
      ) : (
        <p style={{ margin: "0px 5px", fontWeight: 800 }}>
          {product?.price - (product?.price * product?.sale) / 100} $
        </p>
      )}
    </Card>
  );
}

export default CardItem;
