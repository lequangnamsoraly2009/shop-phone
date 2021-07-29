import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../api/axiosClient";
import {
  getProductsFilter,
  setPaginationFilter,
  setResultFilter,
} from "../app/filterSlice";

const ProductFilterAPI = () => {
  const { categoryFilter, sortFilter, searchFilter, pageFilter } = useSelector(
    (state) => state.productsFilter
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProductsFilter = async () => {
      const response = await API.get(
        `/api/filter/products?limit=${
          pageFilter * 20
        }&${categoryFilter}&${sortFilter}&title[regex]=${searchFilter}`
      );
      // const response = await API.get(`/api/products?limit=${1*20}&&&title[regex]=`);
      dispatch(getProductsFilter(response.data.products));
      dispatch(setPaginationFilter(response.data.products));
      dispatch(setResultFilter(response.data.result));
    };
    getAllProductsFilter();
  }, [dispatch, pageFilter, categoryFilter, sortFilter, searchFilter]);
};

export default ProductFilterAPI;
