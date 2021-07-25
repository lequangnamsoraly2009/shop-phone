import { useEffect } from "react";
import { useDispatch} from "react-redux";
import API from "../api/axiosClient";
import { getProducts } from "../app/productSlice";

const ProductAPI = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await API.get(`/api/products`);
      // const response = await API.get(`/api/products?limit=${1*20}&&&title[regex]=samsung`);
      dispatch(getProducts(response.data.products));
    };
    getAllProducts();
  }, [dispatch]);
};

export default ProductAPI;
