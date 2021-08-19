import React from "react";
import { Button } from "antd";
import moment from "moment";
import API from "../../../../../../api/axiosClient";
import { useSelector } from "react-redux";

function QuestionItem({ question, setIsLike}) {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);

  const handleOnClickLike = async () => {
    try {
      await API.patch(
        `/api/questions/like/${question._id}`,
        { userUID: user._id },
        {
          headers: { Authorization: token },
        }
      );
      setIsLike(true);
    } catch (error) {}
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
        <Button type="primary" size="middle" onClick={handleOnClickLike}>
          Helpful({question.like})
        </Button>
      </div>
    </div>
  );
}

export default QuestionItem;
