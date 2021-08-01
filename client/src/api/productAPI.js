import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../api/axiosClient";
import { getPayments, setPaginationPayments } from "../app/paymentSlice";
import { getProducts } from "../app/productSlice";

const ProductAPI = () => {
  const dispatch = useDispatch();
  const { searchPayments } = useSelector((state) => state.payments);
  const { token } = useSelector((state) => state.token);

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await API.get(`/api/products`);
      // const response = await API.get(`/api/products?limit=${1*20}&&&title[regex]=samsung`);
      dispatch(getProducts(response.data.products));
    };
    getAllProducts();
  }, [dispatch]);
  // Xài ké thằng này cho payments :v

  useEffect(() => {
    const getAllPayments = async () => {
      const response = await API.get(
        `/api/admin/payment/?limit=20&&&email[regex]=${searchPayments}`,
        {
          headers: { Authorization: token },
        }
      );
      // const response = await API.get(`/api/products?limit=${1*20}&&&title[regex]=samsung`);
      dispatch(getPayments(response.data.payments));
      dispatch(setPaginationPayments(response.data.payments));
    };
    getAllPayments();
  }, [dispatch, searchPayments, token]);
};

export default ProductAPI;
