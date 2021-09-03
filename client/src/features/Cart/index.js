import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Tag,
  Space,
  Breadcrumb,
  Input,
  Form,
  InputNumber,
  Button,
  Select,
} from "antd";
import CartBanner from "./components/CartBanner";
import CartEmpty from "./components/CartEmpty";
import "./cart.css";
import {
  // addCartPayMentTemp,
  removeManyCart,
  removeOneCart,
  updateCart,
} from "../../app/cartSlice";
import API from "../../api/axiosClient";
import Swal from "sweetalert2";
import {
  getDataDistrict,
  getDataProvince,
  getDataWard,
  setDataFee,
  setDistrict,
  setProvince,
  setWard,
} from "../../app/addressSlice";
import AddressAPI from "../../api/addressAPI";
import moment from "moment";
import VoucherAPI from "../../api/voucherAPI";
import PaymentAPI from "../../api/paymentAPI";
import { useHistory } from "react-router-dom";
import UserAPI from "../../api/userAPI";
import PaypalButton from "../MainPage/pages/CheckOut/PaypalButton";
import { setInformationPaymentPaypal } from "../../app/paymentSlice";

const { Search } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function Cart() {
  const { carts, isLoadingCart } = useSelector((state) => state.carts);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const { vouchers } = useSelector((state) => state.vouchers);
  const { user } = useSelector((state) => state.user);
  const {
    dataProvince,
    dataDistrict,
    dataWard,
    provinceSelect,
    districtSelect,
    wardSelect,
    dataFee,
  } = useSelector((state) => state.address);

  const [total, setTotal] = useState(0);
  const [productChoice, setProductChoice] = useState(0);
  const [productCheckOut, setProductCheckOut] = useState([]);
  const [fee, setFee] = useState(0);
  const [isFee, setIsFee] = useState(false);
  const [voucherCoupon, setVoucherCoupon] = useState(0);
  const [voucherUsed, setVoucherUsed] = useState({});
  const [changeButtonPay, setChangeButtonPay] = useState("cod");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const updateCartToServer = async () => {
      await API.patch(
        "/users/addcart",
        { cart: [...carts] },
        {
          headers: { Authorization: token },
        }
      );
    };

    updateCartToServer();
    // getTotal();
  }, [carts, token]);

  // Get data province
  useEffect(() => {
    dispatch(getDataProvince());
  }, [dispatch]);

  // Get data district when select data province
  useEffect(() => {
    dispatch(getDataDistrict({ provinceSelect }));
  }, [dispatch, provinceSelect]);
  // Get data ward when select data district
  useEffect(() => {
    dispatch(getDataWard({ districtSelect }));
  }, [districtSelect, dispatch]);

  // Check Voucher available for user. If available -> success <-> failure
  const onClickCheckVoucher = async (values) => {
    try {
      // Check voucher exist
      const voucherUsed = vouchers.filter(
        (voucher) => voucher.voucherName === values.toUpperCase()
      );
      if (!voucherUsed) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Voucher is not exist!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      // Check expire date
      else if (
        moment(voucherUsed[0].expiryDate).valueOf() - moment().valueOf() <
        0
      ) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Voucher is expire date!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (voucherUsed[0].numberCodeRemain <= 0) {
        // Check number code remaining
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Voucher is sold out!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        // Pass validate FE -> check user used voucher in the BE
        const response = await VoucherAPI.checkVoucherUsed({
          token,
          voucherId: voucherUsed[0]._id,
          user,
        });
        // Pass all validate -> update state
        setVoucherCoupon(voucherUsed[0].valueCode);
        setVoucherUsed(voucherUsed[0]);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Check it successful!",
          text: `${response.data.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: `${error.response?.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  // Calcualator Fee Ship
  const handleCalFeeShip = async () => {
    try {
      if (provinceSelect === null) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Please select province field!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (districtSelect === null) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Please select district field!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (wardSelect === "") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Please select ward field!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        if (productChoice === 0) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Please select the item you want to buy!",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          const weight = productCheckOut.reduce((item1, item2) => {
            return item1 + item2.general.weight * item2.quantity;
          }, 0);

          const numberProduct = productCheckOut.reduce((item1, item2) => {
            return item1 + item2.quantity;
          }, 0);
          // Check bao hiem gia tri san pham tren 10tr
          let insurance = total * 22795;
          if (insurance > 10000000) {
            insurance = 9999999;
          }
          const dataFee1 = await AddressAPI.getDataFee({
            service_type: 1,
            insurance,
            wardSelect,
            districtSelect,
            weight,
            numberProduct,
          });
          const dataFee2 = await AddressAPI.getDataFee({
            service_type: 2,
            insurance,
            wardSelect,
            districtSelect,
            weight,
            numberProduct,
          });

          const dataFeeExpress = { ...dataFee1.data.data, name: "Express" };
          const dataFeeStandard = { ...dataFee2.data.data, name: "Standard" };

          const dataFee = [dataFeeExpress, dataFeeStandard];

          dispatch(setDataFee(dataFee));
          setIsFee(true);
        }
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          "Due to the epidemic problem, it is not possible to deliver to this address!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  // Handle on click Shipping Fee
  const handleOnSelectFee = (totalFee) => {
    setFee(totalFee);
  };

  const increment = (idProduct) => {
    //   console.log(idProduct)
    carts.forEach((item) => {
      const temp = { ...item };
      if (temp._id === idProduct) {
        temp.quantity += 1;
      }
      dispatch(updateCart(temp));
    });
  };

  const decrement = (idProduct) => {
    //   console.log(idProduct)
    carts.forEach((item) => {
      const temp = { ...item };
      if (temp._id === idProduct) {
        temp.quantity === 1 ? (temp.quantity = 1) : (temp.quantity -= 1);
      }
      dispatch(updateCart(temp));
    });
  };

  const removeCartItem = (idProduct) => {
    dispatch(removeOneCart(idProduct));
  };

  const onFinishInformation = async (values) => {
    try {
      if (isLoggedIn === false) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Login or Register to Payment",
        });
      } else if (productChoice === 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title:
            "You have not selected any products to pay! Please check again !",
          // showConfirmButton: true,
          timer: 5000,
        });
      } else if (values.methodPayment === "cod") {
        if (
          provinceSelect === null ||
          districtSelect === null ||
          wardSelect === ""
        ) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Select full address please !",
            // showConfirmButton: true,
            timer: 2000,
          });
        } else {
          const province = dataProvince.filter(
            (province) => province.ProvinceID === provinceSelect
          );
          const district = dataDistrict.filter(
            (district) => district.DistrictID === districtSelect
          );
          const ward = dataWard.filter((ward) => ward.WardCode === wardSelect);
          const addressDelivery = {
            province: province[0].ProvinceName,
            district: district[0].DistrictName,
            ward: ward[0].WardName,
          };
          const { email, methodPayment, nameReceiver, note, numberPhone } =
            values;
          await PaymentAPI.createPayment({
            cart: productCheckOut,
            address: addressDelivery,
            phone: numberPhone,
            notes: note,
            fullNameReceiver: nameReceiver,
            emailReceiver: email,
            methodPayment,
            voucherValue: voucherCoupon,
            feeShipValue: fee,
            token,
          });
          await UserAPI.deleteVoucherSave({ token, voucher: voucherUsed });
          await VoucherAPI.updateVoucherRemain({
            token,
            _id: voucherUsed._id,
            user,
          });
          dispatch(removeManyCart(productCheckOut));
          dispatch(setProvince(null));
          dispatch(setDistrict(null));
          dispatch(setWard(""));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You have successfully placed an order !",
            showConfirmButton: false,
            timer: 3000,
          });
          setTimeout(() => {
            history.push("/home/cart");
          }, 3000);
        }
      } else if (values.methodPayment === "paypal") {
        if (
          provinceSelect === null ||
          districtSelect === null ||
          wardSelect === ""
        ) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Select full address please !",
            // showConfirmButton: true,
            timer: 2000,
          });
        } else {
          const province = dataProvince.filter(
            (province) => province.ProvinceID === provinceSelect
          );
          const district = dataDistrict.filter(
            (district) => district.DistrictID === districtSelect
          );
          const ward = dataWard.filter((ward) => ward.WardCode === wardSelect);
          const addressDelivery = {
            province: province[0].ProvinceName,
            district: district[0].DistrictName,
            ward: ward[0].WardName,
          };
          const informationCheckout = {
            address: addressDelivery,
            inforUser: values,
            cart: productCheckOut,
            voucherValue: voucherCoupon,
            feeShipValue: fee,
          };
          dispatch(setInformationPaymentPaypal(informationCheckout));
          dispatch(removeManyCart(productCheckOut));
          dispatch(setProvince(null));
          dispatch(setDistrict(null));
          dispatch(setWard(""));
          // await PaymentAPI.createPayment({
          //   cart: productCheckOut,
          //   address: addressDelivery,
          //   phone: numberPhone,
          //   notes: note,
          //   fullNameReceiver: nameReceiver,
          //   emailReceiver: email,
          //   methodPayment,
          //   voucherValue: voucherCoupon,
          //   feeShipValue: fee,
          //   token,
          // });
          // await UserAPI.deleteVoucherSave({ token, voucher: voucherUsed });
          // await VoucherAPI.updateVoucherRemain({
          //   token,
          //   _id: voucherUsed._id,
          //   user,
          // });
          // dispatch(removeManyCart(productCheckOut));
          // dispatch(setProvince(null));
          // dispatch(setDistrict(null));
          // dispatch(setWard(""));
          // Swal.fire({
          //   position: "center",
          //   icon: "success",
          //   title: "You have successfully placed an order !",
          //   showConfirmButton: false,
          //   timer: 3000,
          // });
          setTimeout(() => {
            history.push("/home/checkout");
          }, 3000);
        }
      } else {
        console.log("cc");
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong!",
        text: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 3000,
      });
    }

    // dispatch(addCartPayMentTemp(productCheckOut));
  };

  const handleOnSelectProvince = (value) => {
    dispatch(setProvince(value));
    setIsFee(false);
    dispatch(setDistrict(null));
    dispatch(setWard(""));
  };

  const handleOnSelectDistrict = (value) => {
    dispatch(setDistrict(value));
    dispatch(setWard(""));
    setIsFee(false);
  };

  const handleOnSelectWard = (value) => {
    dispatch(setWard(value));
    setIsFee(false);
  };

  // const sendPayMentCart = () => {
  //   if (isLoggedIn === false) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Please Login or Register to Payment",
  //     });
  //   } else if (productChoice === 0) {
  //     Swal.fire({
  //       position: "center",
  //       icon: "error",
  //       title:
  //         "You have not selected any products to pay! Please check again !",
  //       // showConfirmButton: true,
  //       timer: 5000,
  //     });
  //   }
  //   dispatch(addCartPayMentTemp(productCheckOut));
  // };

  if (isLoadingCart === true) {
    return <div>Loading</div>;
  }

  if (carts.length === 0 && isLoadingCart === false) {
    return <CartEmpty />;
  }

  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
      render: (text, record, index) => (
        <>
          <div className="cart-product-infor">
            <img src={record.images.url} alt="hi" />
            <a
              style={{ textTransform: "capitalize" }}
              href={`/detail/${record._id}`}
            >
              {record.title}
            </a>
          </div>
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record, index) => (
        <span>
          {Math.floor(record.price - record.price * (record.sale / 100))}$
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: ["quantity", "_id"],
      key: "amount",
      render: (text, record, index) => (
        <>
          <div className="cart-amount">
            <button onClick={() => decrement(record._id)}>-</button>
            <input
              className="cart-amount-input"
              readOnly
              type="text"
              value={record.quantity}
            />
            <button onClick={() => increment(record._id)}>+</button>
          </div>
        </>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (tags) => (
        <>
          {" "}
          {tags === "Stocking" ? (
            <Tag color="green" key={tags}>
              {tags}
            </Tag>
          ) : tags === "OutStocking" ? (
            <Tag color="red" key={tags}>
              {tags}
            </Tag>
          ) : (
            <Tag color="brown" key={tags}>
              {tags}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Total Price",
      dataIndex: ["price", "quantity"],
      key: "totalPrice",
      render: (text, record, index) => (
        <span>
          {Math.floor(record.price - record.price * (record.sale / 100)) *
            record.quantity}{" "}
          $
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (text, record, index) => (
        <Space size="middle">
          <div
            style={{ color: "rgb(25,144,255)", cursor: "pointer" }}
            onClick={() => removeCartItem(record._id)}
          >
            Delete
          </div>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const totalPrice = selectedRows.reduce((item1, item2) => {
        return (
          item1 +
          Math.floor(item2.price - item2.price * (item2.sale / 100)) *
            item2.quantity
        );
      }, 0);
      setTotal(totalPrice);
      setProductChoice(selectedRows.length);
      setProductCheckOut(selectedRows);
    },
  };

  const culumnsAddressFee = [
    {
      title: "Service Type",
      dataIndex: "name",
      render: (text, record, index) => <span>{record.name}</span>,
      align: "center",
    },
    {
      title: "Service Fee",
      dataIndex: "service_fee",
      render: (text, record, index) => (
        <span>
          {(Math.round((record.service_fee / 22795) * 100) / 100).toFixed(2)} $
        </span>
      ),
      align: "center",
    },
    {
      title: "Insurance Fee",
      dataIndex: "insurance_fee",
      render: (text, record, index) => (
        <span>
          {(Math.round((record.insurance_fee / 22795) * 100) / 100).toFixed(2)}{" "}
          $
        </span>
      ),
      align: "center",
    },
    {
      title: "Coupon Value",
      dataIndex: "coupon_value",
      render: (text, record, index) => <span>{record.coupon_value} $</span>,
      align: "center",
    },
    {
      title: "Total Fee",
      dataIndex: "total",
      render: (text, record, index) => (
        <span>
          {(Math.round((record.total / 22795) * 100) / 100).toFixed(2)} $
        </span>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="large">
          <Button
            type="primary"
            onClick={() =>
              handleOnSelectFee(
                (Math.round((record.total / 22795) * 100) / 100).toFixed(2)
              )
            }
          >
            Choose
          </Button>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="cart-full-wrapper">
        <div className="breadcumb-wrapper">
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              Cart
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <CartBanner />
        <div className="cart-table">
          <div className="cart-table-header">
            <div className="cart-row">
              <Table
                rowSelection={{
                  type: "checkbox",
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={carts}
              />
            </div>
          </div>
          <div className="cart-total-wrapper">
            <div className="cart-total-price">
              <div className="cart-total">
                <h2 style={{ fontWeight: 800 }}>Total Cart</h2>
              </div>
              <div className="cart-total  ">
                <span>Totals Price ({productChoice} products):</span>
                <span style={{ color: "rgb(25,144,255)" }}>{total} $</span>
              </div>
              <div className="cart-total ">
                <span>Voucher Coupon:</span>
                <span>{voucherCoupon} $</span>
              </div>
              <div className="cart-total ">
                <span>Shipping:</span>
                <span>{fee} $</span>
              </div>
              <div className="cart-total ">
                <span>Total:</span>
                <span style={{ color: "rgb(247,69,46)" }}>
                  {total + Number(fee) + voucherCoupon} $
                </span>
              </div>
            </div>
          </div>
          <div className="cart-checkout">
            <div className="cart-checkout-coupon">
              <div className="cart-checkout-coupon-header">
                <span>Voucher Counpon</span>
              </div>
              <div className="cart-checkout-coupon-form">
                <Search
                  placeholder="Input Your Voucher"
                  enterButton="Check It"
                  size="large"
                  onSearch={onClickCheckVoucher}
                />
              </div>
            </div>
            <div className="cart-checkout-address">
              <div className="cart-checkout-coupon-header">
                <span>Address Receiver</span>
              </div>
              <div className="cart-checkout-address-select">
                <div className="cart-checkout-address-province">
                  <div>
                    <span>Province/City</span>
                  </div>
                  <Select
                    defaultValue={dataProvince[0]?.ProvinceName}
                    style={{ width: 300 }}
                    onChange={handleOnSelectProvince}
                  >
                    {dataProvince?.map((province) => (
                      <Option
                        key={province.ProvinceID}
                        value={province.ProvinceID}
                      >
                        {province.ProvinceName}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="cart-checkout-address-province">
                  <div>
                    <span>District</span>
                  </div>
                  <Select
                    defaultValue={dataDistrict[0]?.DistrictName}
                    style={{ width: 300 }}
                    onChange={handleOnSelectDistrict}
                  >
                    {dataDistrict?.map((district) => (
                      <Option
                        key={district.DistrictID}
                        value={district.DistrictID}
                      >
                        {district.DistrictName}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="cart-checkout-address-province">
                  <div>
                    <span>Ward/Commune</span>
                  </div>
                  <Select
                    // defaultValue=""
                    style={{ width: 300 }}
                    onChange={handleOnSelectWard}
                  >
                    {dataWard?.map((ward) => (
                      <Option key={ward.WardCode} value={ward.WardCode}>
                        {ward.WardName}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="cart-checkout-address-button">
                <Button type="primary" onClick={handleCalFeeShip}>
                  Check Shipping Fee
                </Button>
              </div>
              {isFee ? (
                <div className="cart-checkout-address-fee">
                  <Table
                    dataSource={dataFee}
                    rowKey={(record) => record.name}
                    columns={culumnsAddressFee}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="cart-checkout-information">
              <div className="cart-checkout-coupon-header">
                <span>Receiver's Information</span>
              </div>
              <div className="cart-checkout-information-form">
                <Form
                  style={{ margin: "30px 0" }}
                  {...layout}
                  name="nest-messages"
                  onFinish={onFinishInformation}
                >
                  <Form.Item
                    name="nameReceiver"
                    label="Full Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your full name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Please input your email",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="numberPhone"
                    label="Number Phone"
                    rules={[
                      {
                        type: "number",
                        minLength: 9,
                        maxLength: 9,
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item name="note" label="Note">
                    <Input.TextArea autoSize={{ minRows: 7, maxRows: 7 }} />
                  </Form.Item>
                  <Form.Item
                    name="methodPayment"
                    label="Method Payment"
                    rules={[
                      {
                        message: "Please select a method payment",
                        required: true,
                      },
                    ]}
                  >
                    <Select onSelect={(value) => setChangeButtonPay(value)}>
                      <Select.Option value="cod">
                        Cash On Delivery
                      </Select.Option>
                      <Select.Option value="paypal">
                        Payment With Paypal
                      </Select.Option>
                      <Select.Option value="vnpay">
                        Payment With VN Pay
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 15 }}>
                    {changeButtonPay === "paypal" ? (
                      <Button type="primary" htmlType="submit">
                        Pay With Paypal
                      </Button>
                    ) : changeButtonPay === "vnpay" ? (
                      <Button type="primary" htmlType="submit">
                        Pay With VNPay
                      </Button>
                    ) : (
                      <Button type="primary" htmlType="submit">
                        Pay COD
                      </Button>
                    )}
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
