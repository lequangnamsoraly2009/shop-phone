import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClient,
  setNumberPaymentFilterMonth,
  setDevice,
  setOperatingSystem,
  setDataPaymentFilterMonth,
} from "../app/dashBoardSlice";
import API from "./axiosClient";

function DashboardAPI() {
  const { deviceUsers } = useSelector((state) => state.usersAdmin);
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  // Get data for every month -> Chart Bar Data Payments For 2021
  useEffect(() => {
    const getPaymentsMonth = async () => {
      let arrResult = [];
      let arrDataPayments = [];
      for (let monthFilter = 1; monthFilter <= 12; monthFilter++) {
        const response = await API.post(
          "/api/payment_filter",
          { monthFilter },
          {
            headers: { Authorization: token },
          }
        );
        arrResult.push(response.data.result);
        arrDataPayments.push(response.data.filterPayments);
      }
      dispatch(setNumberPaymentFilterMonth(arrResult));
      dispatch(setDataPaymentFilterMonth(arrDataPayments));
    };
    getPaymentsMonth();
  }, [token, dispatch]);

  useEffect(() => {
    let oSys = [];
    let cli = [];
    let device = [];
    deviceUsers.forEach((user) => {
      oSys.push(user.resultDevice?.os);
      cli.push(user.resultDevice?.client);
      device.push(user.resultDevice?.device);
    });
    dispatch(setOperatingSystem(oSys));
    dispatch(setClient(cli));
    dispatch(setDevice(device));
  }, [deviceUsers, dispatch]);
}

export default DashboardAPI;
