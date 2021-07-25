import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../api/axiosClient";
import { getProducts } from "../app/productSlice";

const ProductAPI = () => {
  const {category,sort,search,page,result} = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProductsFilter = async () => {
      const response = await API.get(`/api/products?limit=${page*20}&${category}&${sort}&title[regex]=${search}`);
      // const response = await API.get(`/api/products?limit=${1*20}&&&title[regex]=`);
      dispatch(getProducts(response.data.products));
    };
    getAllProductsFilter();
  }, [dispatch,page,category,sort,search]);
};

export default ProductAPI;
