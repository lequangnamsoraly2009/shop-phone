import React from "react";
import { Button } from "antd";

function QuestionItem() {
  return (
    <div className="question-right-question">
      <div className="question-right-Q">
        <p>Q: Is the Verizon model factory unlocked?</p>
        <span>Asked 9 months ago by Anthony.</span>
      </div>
      <div className="question-right-A">
        <p>A:Answer Verizon phones are automatically unlocked after 60 days.</p>
        <span>Answered 9 months ago by ToreyC</span>
      </div>
      <div className="question-right-wrapper">
        <Button type="primary" size="middle">
          Helpful(16)
        </Button>
        <Button type="primary" danger size="middle">
          Unhelpful(2)
        </Button>
      </div>
    </div>
  );
}

export default QuestionItem;
