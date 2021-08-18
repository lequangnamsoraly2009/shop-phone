import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalAsk from "./modelAsk";
import "./question.css";
import Swal from "sweetalert2";
import PendingQuestionProductAPI from "../../../../../../api/pendingQuestionProductAPI";
import QuestionItem from "./questionItem";
import { getAllQuestionForProduct } from "../../../../../../app/questionProductSlice";

function QuestionAndAnswers({ detailProduct }) {
  const [visible, setVisible] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const { questionProducts } = useSelector((state) => state.questionProducts);

  const dispatch = useDispatch();

  // Get data from API to redux when we select product
  useEffect(() => {
    dispatch(getAllQuestionForProduct({ product_id: detailProduct._id }));
  }, [dispatch, detailProduct._id]);

  const showModalAsk = () => {
    setVisible(true);
  };

  const showAllQuestions = () => {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Sorry! The service is being upgraded!",
      confirmButtonText: "Cool",
    });
  };

  const onFinish = async (values) => {
    try {
      const { question } = values;
      await PendingQuestionProductAPI.createPendingQuestionProduct({
        question,
        userName: user.userName,
        product_id: detailProduct._id,
        token,
      });
      setVisible(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          "Create Question Success ! Please Waiting For The Mod To Confirm",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
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
          onClick={() => showAllQuestions()}
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
        {questionProducts.map((question) => (
          <QuestionItem key={question._id} question={question} />
        ))}
      </div>
    </div>
  );
}

export default QuestionAndAnswers;
