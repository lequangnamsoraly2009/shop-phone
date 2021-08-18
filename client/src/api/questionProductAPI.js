import API from "./axiosClient";

const QuestionProductAPI = {
  getAllQuestionForProduct: ({ product_id }) => {
    return API.get(`/api/questions/${product_id}`);
  },
};

export default QuestionProductAPI;
