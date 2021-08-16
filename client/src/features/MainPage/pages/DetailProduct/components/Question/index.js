import { Button } from "antd";
import React, { useState } from "react";
import ModalAsk from "./modelAsk";
import "./question.css";

function QuestionAndAnswers() {
  const [visible, setVisible] = useState(false);

  const showModalAsk = () => {
    setVisible(true);
  };

  const onFinish = (values) => {
    console.log(values);
  };

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
            backgroundColor: "rgb(253,92,50)",
            cursor: "pointer",
            color: "#fff",
            letterSpacing: "1px",
          }}
          onClick={showModalAsk}
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
            backgroundColor: "rgb(253,92,50)",
            cursor: "pointer",
            color: "#fff",
            letterSpacing: "1px",
          }}
          // onClick={showModalAsk}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          See All Questions
        </div>
        <ModalAsk
          visible={visible}
          onFinish={onFinish}
          onCancel={() => {
            setVisible(false);
          }}
        />
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
