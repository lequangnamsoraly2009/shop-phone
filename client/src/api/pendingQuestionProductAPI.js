import API from "./axiosClient";

const PendingQuestionProductAPI = {
    getAllPendingQuestionProducts: () => {
    return API.get(
      `/api/filter/products`
    );
  }
};

export default PendingQuestionProductAPI;
