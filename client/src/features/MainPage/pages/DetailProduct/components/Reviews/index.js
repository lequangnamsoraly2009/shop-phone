import React from "react";
import { Progress } from "antd";

import { StarOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import "./reviews.css";

function Reviews() {
  return (
    <div className="reviews">
      <div className="reviews_top">
        <div className="reviews_top-star">
          <div>
            <span>Customer Rating</span>
          </div>
          <div className="reviews_top-star-point">
            <span>4.7</span>
            <StarOutlined />
          </div>
          <div>
            <span>(123) Reviews</span>
          </div>
          <div>
            <div
              className="btn"
              style={{
                width: "60%",
                textAlign: "center",
                backgroundColor: "rgb(228, 228, 228)",
                cursor: "pointer",
                letterSpacing: "1px",
              }}
              // onClick={addCartItem}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Write a Review
            </div>
          </div>
        </div>
        <div className="reviews_top-progress">
          <div className="reviews_top-progress-star">
            <div className="reviews_top-progress-star-1">
              <span>5</span>
              <StarFilled style={{color: "red"}} />
            </div>
            <div className="reviews_top-progress-star-2">
              <Progress percent={40} showInfo={false} />
            </div>
            <div className="reviews_top-progress-star-3">
              <span>8 rating</span>
            </div>
          </div>
          <div className="reviews_top-progress-star">
            <div className="reviews_top-progress-star-1">
              <span>4</span>
              <StarFilled style={{color: "red"}} />
            </div>
            <div className="reviews_top-progress-star-2">
              <Progress percent={10} showInfo={false} />
            </div>
            <div className="reviews_top-progress-star-3">
              <span>2 rating</span>
            </div>
          </div>
          <div className="reviews_top-progress-star">
            <div className="reviews_top-progress-star-1">
              <span>3</span>
              <StarFilled style={{color: "red"}} />
            </div>
            <div className="reviews_top-progress-star-2">
              <Progress percent={15} showInfo={false} />
            </div>
            <div className="reviews_top-progress-star-3">
              <span>3 rating</span>
            </div>
          </div>
          <div className="reviews_top-progress-star">
            <div className="reviews_top-progress-star-1">
              <span>2</span>
              <StarFilled style={{color: "red"}} />
            </div>
            <div className="reviews_top-progress-star-2">
              <Progress percent={25} showInfo={false} />
            </div>
            <div className="reviews_top-progress-star-3">
              <span>5 rating</span>
            </div>
          </div>
          <div className="reviews_top-progress-star">
            <div className="reviews_top-progress-star-1">
              <span>1</span>
              <StarFilled style={{color: "red"}} />
            </div>
            <div className="reviews_top-progress-star-2">
              <Progress percent={10} showInfo={false} />
            </div>
            <div className="reviews_top-progress-star-3">
              <span>2 rating</span>
            </div>
          </div>
        </div>
        <div className="reviews_top-create">Apple</div>
      </div>
    </div>
  );
}

export default Reviews;
