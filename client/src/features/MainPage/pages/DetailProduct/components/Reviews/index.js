import React, { useState } from "react";
import { Progress } from "antd";
import { StarFilled } from "@ant-design/icons";
import "./reviews.css";
import ListComments from "./listComment";
import ModalReview from "./modelReview";
import { useSelector } from "react-redux";
import API from "../../../../../../api/axiosClient";

function Reviews({ detailProduct, socket }) {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => state.user);

  const onFinish = async (values) => {
    const { message, rating, title } = values;
    setVisible(false);

    socket.emit("createCommentReview", {
      userName: user.userName,
      message,
      rating,
      title,
      product_id: detailProduct._id,
    });
    if (rating && rating !== 0) {
      await API.patch(`/api/products/${detailProduct._id}`,{rating});
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <div className="reviews">
      <div className="reviews_top">
        <div className="reviews_top-star">
          <div className="reviews_top-star-header">
            <span>Customer Rating</span>
          </div>
          <div className="reviews_top-star-point">
            {detailProduct.numberReviews === 0 ? (
              <span>0</span>
            ) : (
              <span>{detailProduct.rating / detailProduct.numberReviews}</span>
            )}
            <StarFilled style={{ color: "red", fontSize: "22px" }} />
          </div>
          <div className="reviews_top-star-count">
            <span>({detailProduct.numberReviews} Reviews)</span>
          </div>
        </div>
        <div className="reviews_top-progress">
          <div className="reviews_top-progress-star">
            <div className="reviews_top-progress-star-1">
              <span>5</span>
              <StarFilled style={{ color: "red" }} />
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
              <StarFilled style={{ color: "red" }} />
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
              <StarFilled style={{ color: "red" }} />
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
              <StarFilled style={{ color: "red" }} />
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
              <StarFilled style={{ color: "red" }} />
            </div>
            <div className="reviews_top-progress-star-2">
              <Progress percent={10} showInfo={false} />
            </div>
            <div className="reviews_top-progress-star-3">
              <span>2 rating</span>
            </div>
          </div>
        </div>
        <div className="reviews_top-create">
          <div style={{ display: "flex", margin: "auto 0" }}>
            <div
              className="btn"
              style={{
                width: "100%",
                textAlign: "center",
                margin: "auto",
                backgroundColor: "rgb(228, 228, 228)",
                cursor: "pointer",
                letterSpacing: "1px",
              }}
              onClick={showModal}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Write a Review
            </div>
          </div>
          <ModalReview
            visible={visible}
            onFinish={onFinish}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </div>
      </div>
      <div className="reviews_bot">
        <div className="reviews_bot-header">
          <span>Customer Reviews</span>
        </div>
        <div className="reviews_bot-list">
          {/* <div className="reviews_bot-list-item">
            <div className="reviews_bot-list-item-header">
              <p>Soraly XYZ</p>
              <span>- Ngày 2021-08-10 13:23:25</span>
            </div>
            <div className="reviews_bot-list-item-comment">
              <div className="star">
                <Rate disabled defaultValue={5} style={{ color: "red" }} />
              </div>
              <div className="comment">
                <span>
                  Mua hàng Cellphones online lần đầu mà chắc cũng là lần cuối.
                  Con máy cũng 20 củ mà nhận được thì bị trầy. Thời gian giãn
                  cách nên không đi mua trực tiếp được lại bị vậy. Chán thực sự.
                </span>
              </div>
            </div>
          </div> */}
          <ListComments />
        </div>
      </div>
    </div>
  );
}

export default Reviews;
