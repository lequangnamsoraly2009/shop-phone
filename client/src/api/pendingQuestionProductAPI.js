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
};

export default PendingQuestionProductAPI;
