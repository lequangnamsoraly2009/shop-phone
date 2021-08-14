import React, { createElement, useState } from "react";
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

function ListComments({ review, socket }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [reply, setReply] = useState(false);

  const { user } = useSelector((state) => state.user);

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

  const handleReplyReview = () => {
    setReply(true);
  };

  const handleHideReplyReview = () => {
    setReply(false);
  };

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

    <span key="comment-basic-reply-to" onClick={handleHideReplyReview}>
      Show more replies
    </span>,
  ];

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

  return (
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
          {/* <h3><Rate disabled defaultValue={review.rating} style={{color: "red"}} /> {review.title}</h3> */}
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
      {reply && (
        <>
          {/* {comments.length > 0 && <CommentList comments={comments} />} */}
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
      <div className="reply-review">
        {review.replies?.map((rep) => (
          <Comment
            // actions={actions}
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
