import API from "./axiosClient";

const PendingQuestionProductAPI = {
  getAllPendingQuestionProducts: ({ token }) => {
    return API.get("/api/pending_questions", {
      headers: { Authorization: token },
    });
  },
  getPendingQuestionProductsByPage: ({ page, pageSize, token }) => {
    return API.get(`/api/pending_questions?limit=${pageSize * page}`, {
      headers: { Authorization: token },
    });
  },
  deletePendingQuestionProduct: ({ _id, token }) => {
    return API.delete(`/api/pending_questions/${_id}`, {
      headers: { Authorization: token },
    });
  },
  confirmPendingQuestionProduct: ({ question_id, replyQuestion, questionCreatedAt, token }) => {
    return API.post(
      "/api/confirm_question",
      {
        question_id,
        replyQuestion,
        questionCreatedAt
      },
      {
        headers: { Authorization: token },
      }
    );
  },
};

export default PendingQuestionProductAPI;
