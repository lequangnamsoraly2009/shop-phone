import API from "../api/axiosClient";

const CategoryAPI = {
  getAllCategories: (searchCategories) => {
    return API.get(
      `/api/category?limit=${
        1 * 20
      }&&&nameCategorySearch[regex]=${searchCategories}`
    );
  },

  // useEffect(() => {
  //   const getAllCategories = async () => {
  //     const response = await API.get(
  //       `/api/category?limit=${
  //         1 * 20
  //       }&&&nameCategorySearch[regex]=${searchCategories}`
  //     );
  //     dispatch(getCategories(response.data.categories));
  //     dispatch(setPaginationCategories(response.data.categories));
  //     //   console.log(response);
  //   };
  //   getAllCategories();
  // }, [dispatch,searchCategories]);
};

export default CategoryAPI;
