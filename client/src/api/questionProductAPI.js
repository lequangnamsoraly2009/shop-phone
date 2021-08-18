import API from "./axiosClient";

const QuestionProductAPI = {
  getAllQuestionForProduct: ({ product_id }) => {
    return API.get(`/api/questions/${product_id}`);
  },
  getQuestionForProductPage: ({product_id, page, pageSize})=>{
    return API.get(`/api/questions/${product_id}?limit=${page*pageSize}`);
  }
};

export default QuestionProductAPI;
