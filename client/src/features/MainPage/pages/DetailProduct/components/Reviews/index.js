import React, { useEffect, useState } from "react";
import { Progress, Pagination } from "antd";
import { StarFilled } from "@ant-design/icons";
import "./reviews.css";
import ListComments from "./listComment";
import ModalReview from "./modelReview";
import { useSelector } from "react-redux";
import API from "../../../../../../api/axiosClient";

function Reviews({ detailProduct, socket }) {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [loadingReview, setLoadingReview] = useState(false);

  const onFinish = async (values) => {
    const { message, rating, title } = values;
    setVisible(false);

    const createdAt = new Date().toISOString();

    socket.emit("createCommentReview", {
      userName: user.userName,
      message,
      rating,
      title,
      product_id: detailProduct._id,
      createdAt,
    });

    if (rating && rating !== 0) {
      await API.patch(`/api/products/${detailProduct._id}}`, {
        rating,
      });
    }
  };

  useEffect(() => {
    const loadDataReview = async () => {
      try {
        setLoadingReview(true);
        const response = await API.get(
          `/api/review-comments/${detailProduct._id}?limit=${1 * 3}`
        );
        const responseAll = await API.get(
          `/api/review-all-comments/${detailProduct._id}`
        );
        setAllReviews(responseAll.data.reviews);
        setReviews(response.data.reviews);
        setLoadingReview(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadDataReview();
  }, [detailProduct._id]);

  // Handle Change Page Review
  const handleChangePageReviews = async (page, pageSize) => {
    try {
      setLoadingReview(true);
      const response = await API.get(
        `/api/review-comments/${detailProduct._id}?limit=${page * pageSize}`
      );
      const dataSlice = response.data.reviews.slice(
        (page - 1) * pageSize,
        page * pageSize
      );
      setReviews(dataSlice);
      setLoadingReview(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Real Time
  // Join Room
  useEffect(() => {
    if (socket) {
      socket.emit("joinRoomReviewsProduct", detailProduct._id);
    }
  }, [socket, detailProduct._id]);

  useEffect(() => {
    if (socket) {
      socket.on("sendReviewToClient", (msg) => {
        setReviews([msg, ...reviews]);
      });
      return () => socket.off("sendReviewToClient");
    }
  }, [socket, reviews]);

  // Reply Reviews
  useEffect(() => {
    if (socket) {
      socket.on("sendReplyReviewToClient", (msg) => {
        console.log(msg)
        const newArr = [...allReviews];
        newArr.forEach((review) => {
          if (review._id === msg._id) {
            review.replies = msg.replies;
          }
        });
        setReviews(allReviews);
      });
      return () => socket.off("sendReplyReviewToClient");
    }
  }, [socket, allReviews]);

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
              <span>
                {(
                  Math.round(
                    (detailProduct.rating / detailProduct.numberReviews) * 100
                  ) / 100
                ).toFixed(1)}
              </span>
            )}
            <StarFilled style={{ color: "red", fontSize: "22px" }} />
          </div>
          <div className="reviews_top-star-count">
            <span>({detailProduct.numberReviews} Rating)</span>
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
          <span>Customer Reviews ({allReviews.length} reviews)</span>
        </div>
        <div className="reviews_bot-list">
          {reviews.map((review) => (
            <ListComments key={review._id} socket={socket} review={review} />
          ))}
        </div>
        <div className="reviews-pagination">
          {allReviews.length <= 3 ? (
            ""
          ) : (
            <Pagination
              defaultCurrent={1}
              total={allReviews.length}
              showSizeChanger={false}
              pageSize={3}
              onChange={(page, pageSize) =>
                handleChangePageReviews(page, pageSize)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Reviews;