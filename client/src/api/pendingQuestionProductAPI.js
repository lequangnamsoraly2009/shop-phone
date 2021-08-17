import API from "./axiosClient";

const PendingQuestionProductAPI = {
  getAllPendingQuestionProducts: ({ token }) => {
    return API.get("/api/pending_questions", {
      headers: { Authorization: token },
    });
  },
};

export default PendingQuestionProductAPI;
