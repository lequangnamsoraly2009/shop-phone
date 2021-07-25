import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../api/axiosClient";
import { getProductsFilter, setResultFilter } from "../app/filterSlice";

const ProductFilterAPI = () => {
  const {category,sort,search,page} = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProductsFilter = async () => {
      const response = await API.get(`/api/products?limit=${page*20}&${category}&${sort}&title[regex]=${search}`);
      // const response = await API.get(`/api/products?limit=${1*20}&&&title[regex]=`);
      dispatch(getProductsFilter(response.data.products));
        dispatch(setResultFilter(response.data.result));
    };
    getAllProductsFilter();
  }, [dispatch,page,category,sort,search]);
};

export default ProductFilterAPI;
