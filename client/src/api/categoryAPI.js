import { useEffect } from "react";
import { useDispatch } from "react-redux";
import API from "../api/axiosClient";
import { getCategories } from "../app/categorySlice";



const CategoryAPI = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllCategories = async () => {
            const response = await API.get("/api/category");
            dispatch(getCategories(response.data))
            // console.log(response.data)
        }
        getAllCategories();
    },[dispatch])

}

export default CategoryAPI;