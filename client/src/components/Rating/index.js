import { StarOutlined, StarFilled } from "@ant-design/icons";
import React from "react";
import "./rating.css";

function Rating({ rate }) {
  const percentRate =
    100 - (rate.rating / rate.numberReviews) * 20;

  const style_star = {
    clipPath:
    rate.numberReviews === 0
        ? "inset(0 100% 0 0)"
        : `inset(0 ${percentRate}% 0 0)`,
  };

  return (
    <div className="rating">
      <div className="star">
        <StarOutlined />
        <StarOutlined />
        <StarOutlined />
        <StarOutlined />
        <StarOutlined />
        <div className="star-1" style={style_star}>
          <StarFilled />
          <StarFilled />
          <StarFilled />
          <StarFilled />
          <StarFilled />
        </div>
      </div>
    </div>
  );
}

export default Rating;
