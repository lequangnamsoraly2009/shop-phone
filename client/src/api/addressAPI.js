import axios from "axios";

const APIGHN = "https://online-gateway.ghn.vn/shiip/public-api/master-data";
const tokenGHN = "25baf0a4-0418-11ec-b255-166e45bc1992";

const AddressAPI = {
  getDataProvince: () => {
    return axios.get(`${APIGHN}/province`, {
      headers: { token: tokenGHN },
    });
  },
  getDataDistrict: ({ provinceSelect }) => {
    return axios.post(
      `${APIGHN}/district`,
      {
        province_id: provinceSelect,
      },
      {
        headers: { token: tokenGHN },
      }
    );
  },
  getDataWard: ({ districtSelect }) => {
    return axios.post(
      `${APIGHN}/ward`,
      {
        district_id: districtSelect,
      },
      {
        headers: { token: tokenGHN },
      }
    );
  },
};

export default AddressAPI;
