import React, { useState } from "react";
import { Button } from "antd";
import moment from "moment";
import API from "../../../../../../api/axiosClient";
import { useSelector } from "react-redux";

function QuestionItem({ question }) {
  const [disableButtonLike, setDisableButtonLike] = useState(false);
  const [disableButtonDisLike, setDisableButtonDisLike] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);

  const handleOnClickLike = async () => {
    try {
      setDisableButtonDisLike(!disableButtonDisLike);
      await API.patch(
        `/api/questions/like/${question._id}`,
        { userId: user._id },
        {
          headers: { Authorization: token },
        }
      );
    } catch (error) {}
  };

  const handleOnClickDisLike = () => {
    setDisableButtonLike(!disableButtonLike);
  };

  return (
    <div className="question-right-question">
      <div className="question-right-Q">
        <p>Q: {question.question}?</p>
        <span>
          Asked {moment(question.questionCreatedAt).fromNow()} by{" "}
          {question.userName}.
        </span>
      </div>
      <div className="question-right-A">
        <p>A: {question.reply[0].message}</p>
        <span>
          Answered {moment(question.createdAt).fromNow()} by{" "}
          {question.reply[0].userReply}
        </span>
      </div>
      <div className="question-right-wrapper">
        <Button
          type="primary"
          size="middle"
          disabled={disableButtonLike}
          onClick={handleOnClickLike}
        >
          Helpful({question.like})
        </Button>
        <Button
          type="primary"
          danger
          size="middle"
          disabled={disableButtonDisLike}
          onClick={handleOnClickDisLike}
        >
          Unhelpful({question.dislike})
        </Button>
      </div>
    </div>
  );
}

export default QuestionItem;
