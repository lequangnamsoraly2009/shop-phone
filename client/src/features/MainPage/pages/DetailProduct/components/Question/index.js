import { Button } from "antd";
import React from "react";
import "./question.css";

function QuestionAndAnswers() {
  return (
    <div className="question">
      <div className="question-left">
        <div className="question_left-header">
          <span>There are a total of 100 questions</span>
        </div>
        <div
          className="btn"
          style={{
            width: "100%",
            textAlign: "center",
            backgroundColor: "rgb(201,232,242)",
            cursor: "pointer",
            color: "rgb(236, 71, 93)",
            letterSpacing: "1px",
          }}
          //   onClick={addCartItem}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Ask a Question
        </div>
        <div
          className="btn"
          style={{
            marginTop: 10,
            width: "100%",
            textAlign: "center",
            backgroundColor: "rgb(201,232,242)",
            cursor: "pointer",
            color: "rgb(236, 71, 93)",
            letterSpacing: "1px",
          }}
          //   onClick={addCartItem}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          See All Questions
        </div>
      </div>

      <div className="question-right">
        
      <div className="question-right-question">
          <div className="question-right-Q">
            <p>Q: Is the Verizon model factory unlocked?</p>
            <span>Asked 9 months ago by Anthony.</span>
          </div>
          <div className="question-right-A">
            <p>
              A:Answer Verizon phones are automatically unlocked after 60 days.
            </p>
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
        <div className="question-right-question">
          <div className="question-right-Q">
            <p>Q: Is the Verizon model factory unlocked?</p>
            <span>Asked 9 months ago by Anthony.</span>
          </div>
          <div className="question-right-A">
            <p>
              A:Answer Verizon phones are automatically unlocked after 60 days.
            </p>
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
        <div className="question-right-question">
          <div className="question-right-Q">
            <p>Q: Is the Verizon model factory unlocked?</p>
            <span>Asked 9 months ago by Anthony.</span>
          </div>
          <div className="question-right-A">
            <p>
              A:Answer Verizon phones are automatically unlocked after 60 days.
            </p>
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
      </div>
    </div>
  );
}

export default QuestionAndAnswers;
