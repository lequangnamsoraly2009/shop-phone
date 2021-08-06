import API from "../api/axiosClient";

const CategoryAPI = {
  getAllCategories: (searchCategories) => {
    return API.get(
      `/api/category?limit=${
        1 * 20
      }&&&nameCategorySearch[regex]=${searchCategories}`
    );
  },
  deleteCategory: (_id, token) => {
    return API.delete(`/api/admin/category/${_id}`, {
      headers: { Authorization: token },
    });
  },
};

export default CategoryAPI;
