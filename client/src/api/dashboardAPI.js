import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataPaymentFilterMonth } from "../app/dashBoardSlice";
import API from "./axiosClient";

function DashboardAPI() {
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  // Get data for every month -> Chart Bar Data Payments For 2021
  useEffect(() => {
    const getPaymentsMonth = async () => {
      let arrResult = [];
      for (let monthFilter = 1; monthFilter <= 12; monthFilter++) {
        const response = await API.post(
          "/api/payment_filter",
          { monthFilter },
          {
            headers: { Authorization: token },
          }
        );
        arrResult.push(response.data.result);
      }
      dispatch(setDataPaymentFilterMonth(arrResult));
    };
    getPaymentsMonth();
  }, [token, dispatch]);
}

export default DashboardAPI;
