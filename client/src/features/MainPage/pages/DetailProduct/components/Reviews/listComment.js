import React, { createElement, useCallback, useEffect, useState } from "react";
import { Comment, Tooltip, Avatar, Form, Input, Button } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import Rating from "../../../../../../components/Rating";
import { useSelector } from "react-redux";

// const { TextArea } = Input;
const perPage = 3;
let showCommentReviews = [];

function ListComments({ review, socket }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [reply, setReply] = useState(false);
  const [replyChild, setReplyChild] = useState(false);
  const [userReplyChild, setUserReplyChild] = useState("");
  const [replyCommentReview, setReplyCommentReview] = useState([]);
  const [hideReplyComment, setHideReplyComment] = useState(false);
  const [next, setNext] = useState(3);

  const { user } = useSelector((state) => state.user);

  // Slice Comment replies
  const loopWithSlice = useCallback(
    (num) => {
      let start =
        review.replies.length - (perPage + num) < 0
          ? 0
          : review.replies.length - (perPage + num);
      showCommentReviews = review.replies.slice(start, review.replies.length);
      setHideReplyComment(start);
      setReplyCommentReview(showCommentReviews);
    },
    [review.replies]
  );

  useEffect(() => {
    loopWithSlice(0);
  }, [loopWithSlice]);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  // Mở khung comment khi muốn comment lại thằng review
  const handleReplyReview = () => {
    setReply(true);
    setReplyChild(false);
  };

  // Mở khung comment khi reply comment thằng con bên trong thằng review
  const handleReplyReviewChild = (values) => {
    setReplyChild(true);
    setReply(false);
    setUserReplyChild(values);
  };

  // Hide khung comment khi reply thằng review 
  const handleHideReplyReview = () => {
    setReply(false);
  };

  // Hide Khung Comment khi Reply comment con bên trong thằng review
  const handleHideReplyReviewChild = () => {
    setUserReplyChild("");
    setReplyChild(false);
  };

  // Mở show thêm tin nhắn replies từ thằng review cha
  const handleShowMoreReplies = () => {
    loopWithSlice(next);
    setNext(next + perPage);
  };

  // Đóng show tin nhắn replies lại 
  const handleShowLessReplies = () => {
    loopWithSlice(0);
    setNext(3);
  };

  // Socket gửi comment reply với send là replyReview -> Thằng này là comment reply 
  const handleOnSubmit = async (values) => {
    const { message } = values;

    const createdAt = new Date().toISOString();

    socket.emit("createCommentReview", {
      userName: user.userName,
      message,
      product_id: review._id,
      createdAt,
      send: "replyReview",
    });
  };

  // Cái này là các actions của thằng review chính
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <>
      {reply === false ? (
        <span key="comment-basic-reply-to" onClick={handleReplyReview}>
          Reply
        </span>
      ) : (
        <span key="comment-basic-reply-to" onClick={handleHideReplyReview}>
          Hide reply
        </span>
      )}
    </>,
    <>
      {hideReplyComment > 0 ? (
        <span key="comment-basic-reply-to" onClick={handleShowMoreReplies}>
          Show more {hideReplyComment} replies
        </span>
      ) : (
        <span key="comment-basic-reply-to" onClick={handleShowLessReplies}>
          Show less replies
        </span>
      )}
    </>,
  ];

  // Nơi nhập tin nhắn trả lời lại review mà customer đăng
  const Editor = () => (
    <Form onFinish={handleOnSubmit}>
      <Form.Item name="message" initialValue={`@${review.userName}: `}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Reply this review
        </Button>
      </Form.Item>
    </Form>
  );

  // Nơi nhập tin nhắn trả lời lại tin nhắn của thằng comment con 
  const EditorReplyChild = () => (
    <Form onFinish={handleOnSubmit}>
      <Form.Item name="message" initialValue={`@${userReplyChild}: `}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Reply this review
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    // Comment review được đăng của customer - Root
    <Comment
      actions={actions}
      author={review.userName}
      avatar={
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrc-3zHHM18E7n_TuFEs26rqEKbR5n3dp0lA&usqp=CAU"
          alt={review.userName}
        />
      }
      content={
        <>
          <div style={{ display: "flex" }}>
            {review.rating !== 0 && <Rating rate={review} />}{" "}
            <h3 style={{ fontSize: 20 }}>{review.title}</h3>
          </div>
          <span>{review.message}</span>
        </>
      }
      datetime={
        <Tooltip title={moment(review.createdAt).format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment(review.createdAt).fromNow()}</span>
        </Tooltip>
      }
    >
      {/* Reply comment của thằng cha - Tree 0  */}
      {reply && (
        <>
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt={user.userName}
              />
            }
            content={<Editor />}
          />
        </>
      )}
      {/* Reply comment con của thằng review cha - Tree 1 */}
      {replyChild && (
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt={user.userName}
            />
          }
          content={<EditorReplyChild />}
        />
      )}
      {/* List comment review con của thằng review cha  - Tree 1*/}
      <div className="reply-review">
        {replyCommentReview.map((rep) => (
          <Comment
            actions={[
              <Tooltip key="comment-basic-like" title="Like">
                <span onClick={like}>
                  {createElement(
                    action === "liked" ? LikeFilled : LikeOutlined
                  )}
                  <span className="comment-action">{likes}</span>
                </span>
              </Tooltip>,
              <Tooltip key="comment-basic-dislike" title="Dislike">
                <span onClick={dislike}>
                  {React.createElement(
                    action === "disliked" ? DislikeFilled : DislikeOutlined
                  )}
                  <span className="comment-action">{dislikes}</span>
                </span>
              </Tooltip>,
              <>
                {replyChild === false ? (
                  <span
                    key="comment-basic-reply-to"
                    onClick={() => handleReplyReviewChild(rep.userName)}
                  >
                    Reply
                  </span>
                ) : (
                  <span
                    key="comment-basic-reply-to"
                    onClick={handleHideReplyReviewChild}
                  >
                    Hide reply
                  </span>
                )}
              </>,
            ]}
            key={rep._id}
            author={rep.userName}
            avatar={
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrc-3zHHM18E7n_TuFEs26rqEKbR5n3dp0lA&usqp=CAU"
                alt={rep.userName}
              />
            }
            content={
              <>
                <span>{rep.message}</span>
              </>
            }
            datetime={
              <Tooltip
                title={moment(rep.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              >
                <span>{moment(rep.createdAt).fromNow()}</span>
              </Tooltip>
            }
          />
        ))}
      </div>
    </Comment>
  );
}

export default ListComments;
