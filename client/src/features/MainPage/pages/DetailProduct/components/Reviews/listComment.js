import React, { createElement, useState } from "react";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import Rating from "../../../../../../components/Rating";

function ListComments({ review }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

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
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

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
          <div style={{display: "flex"}}>
            {review.rating !== 0 && <Rating rate={review} />}{" "}
            <h3 style={{fontSize: 20}}>{review.title}</h3>
          </div>
          <span>{review.message}</span>
        </>
      }
      datetime={
        <Tooltip title={moment(review.createdAt).format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment(review.createdAt).fromNow()}</span>
        </Tooltip>
      }
    />
  );
}

export default ListComments;
