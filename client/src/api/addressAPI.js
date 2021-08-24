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
  getDataFee: ({
    service_type,
    insurance,
    wardSelect,
    districtSelect,
    weight,
    numberProduct,
  }) => {
    return axios.post(
      "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
      {
        service_type_id: service_type,
        insurance_value: insurance,
        to_ward_code: wardSelect,
        to_district_id: districtSelect,
        from_district_id: 3695,
        coupon: null,
        weight: weight,
        length: 30,
        width: 15,
        height: 10 * numberProduct,
      },
      {
        headers: {
          token: tokenGHN,
          shop_id: "1965562",
        },
      }
    );
  },
};

export default AddressAPI;
