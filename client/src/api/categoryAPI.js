import API from "../api/axiosClient";

const CategoryAPI = {
  getAllCategories: (searchCategories) => {
    return API.get(
      `/api/category?limit&&&nameCategorySearch[regex]=${searchCategories}`
    );
  },
  deleteCategory: (_id, token) => {
    return API.delete(`/api/admin/category/${_id}`, {
      headers: { Authorization: token },
    });
  },
  editCategory: (values, param, token) => {
    return API.put(
      `/api/admin/category/${param.id}`,
      { ...values },
      {
        headers: { Authorization: token },
      }
    );
  },
  createCategory: (values, token) => {
    return API.post(
      "/api/admin/category",
      { ...values },
      {
        headers: { Authorization: token },
      }
    );
  },
};

export default CategoryAPI;
