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
            color: "red",
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
            color: "red",
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

      <div className="question-right"></div>
    </div>
  );
}

export default QuestionAndAnswers;
