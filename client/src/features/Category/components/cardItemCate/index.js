import { Card } from "antd";
import { Meta } from "antd/lib/list/Item";
import React from "react";
import "./carditemcate.css";
import { useHistory } from "react-router-dom";
import Rating from "../../../../components/Rating";

function CardItemCate({ product }) {
  const history = useHistory();

  const rate = {
    rating : product.rating,
    numberReviews: product.numberReviews,
  }

  const onClickDetails = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    history.push(`/detail/${product?._id}`);
  };
  return (
    <Card
      hoverable
      style={{ height: 440 }}
      cover={
        <img
          style={{
            paddingTop: 20,
            height: 235,
            width: 235,
            objectFit: "scale-down",
          }}
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
      <Meta title={product?.title} className="card-item-title" />
      <div className="card-item-rate">
        <Rating rate={rate} />
        <div className="card-item-sold">
          <span>Sold: </span>
          <span>{product?.numberSold}</span>
        </div>
      </div>
      <div className="price-down">
        {product?.sale === 0 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <p
              style={{
                margin: 5,
                // textDecoration: "line-through",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {product?.price} $
            </p>
            <p
              style={{
                margin: 5,
                fontSize: 12,
              }}
            >
              TP.Ho Chi Minh
            </p>
          </div>
        ) : (
          <>
            <p
              style={{
                margin: 5,
                textDecoration: "line-through",
                fontWeight: 300,
                fontSize: 14,
              }}
            >
              {product?.price} $
            </p>

            <span style={{ margin: "auto 0", fontWeight: 300, fontSize: 12 }}>
              -{product?.sale}%
            </span>
          </>
        )}
      </div>
      {product?.sale === 0 ? (
        ""
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <p style={{ margin: "0px 5px", fontWeight: 800, fontSize: 14 }}>
            {(product?.price - ((product?.price * product?.sale) / 100).toFixed(2))} $
          </p>
          <p
            style={{
              margin: "0px 5px",
              fontSize: 12,
            }}
          >
            TP.Ho Chi Minh
          </p>
        </div>
      )}
    </Card>
  );
}

export default CardItemCate;
