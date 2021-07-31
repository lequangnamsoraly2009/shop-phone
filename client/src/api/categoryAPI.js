import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../api/axiosClient";
import { getCategories, setPaginationCategories } from "../app/categorySlice";

const CategoryAPI = () => {
  const dispatch = useDispatch();
  const { searchCategories } = useSelector((state) => state.categories);

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await API.get(
        `/api/category?limit=${
          1 * 20
        }&&&nameCategorySearch[regex]=${searchCategories}`
      );
      dispatch(getCategories(response.data.categories));
      dispatch(setPaginationCategories(response.data.categories));
      //   console.log(response);
    };
    getAllCategories();
  }, [dispatch,searchCategories]);
};

export default CategoryAPI;
