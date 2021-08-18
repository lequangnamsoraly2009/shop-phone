import React from "react";
import { Button } from "antd";
import moment from "moment";

function QuestionItem({question}) {
  return (
    <div className="question-right-question">
      <div className="question-right-Q">
        <p>Q: {question.question}?</p>
        <span>Asked {moment(question.questionCreatedAt).fromNow()} by {question.userName}.</span>
      </div>
      <div className="question-right-A">
        <p>A: {question.reply[0].message}</p>
        <span>Answered {moment(question.createdAt).fromNow()} by {question.reply[0].userReply}</span>
      </div>
      <div className="question-right-wrapper">
        <Button type="primary" size="middle">
          Helpful({question.like})
        </Button>
        <Button type="primary" danger size="middle">
          Unhelpful({question.dislike})
        </Button>
      </div>
    </div>
  );
}

export default QuestionItem;
