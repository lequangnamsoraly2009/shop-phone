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
  addCartPayMentTemp,
  removeOneCart,
  updateCart,
} from "../../app/cartSlice";
import API from "../../api/axiosClient";
import Swal from "sweetalert2";
import {
  getDataDistrict,
  getDataProvince,
  getDataWard,
  setDistrict,
  setProvince,
  setWard,
} from "../../app/addressSlice";
import AddressAPI from "../../api/addressAPI";

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
  const {
    dataProvince,
    dataDistrict,
    dataWard,
    provinceSelect,
    districtSelect,
    wardSelect,
  } = useSelector((state) => state.address);

  const [total, setTotal] = useState(0);
  const [productChoice, setProductChoice] = useState(0);
  const [productCheckOut, setProductCheckOut] = useState([]);

  const dispatch = useDispatch();
  // // Data get when select option
  // const [provinceSelect, setProvinceSelect] = useState(0);
  // const [districtSelect, setDistrictSelect] = useState(0);
  // const [wardSelect, setWardSelect] = useState(0);

  // console.log(districtSelect)

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
          console.log(dataFee1);
          console.log(dataFee2);
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

  const onFinishInformation = (values) => {
    console.log(values);
  };

  const handleOnSelectProvince = (value) => {
    dispatch(setProvince(value));
    dispatch(setDistrict(null));
    dispatch(setWard(""));
  };

  const handleOnSelectDistrict = (value) => {
    dispatch(setDistrict(value));
    dispatch(setWard(""));
  };

  const handleOnSelectWard = (value) => {
    dispatch(setWard(value));
  };

  const sendPayMentCart = () => {
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
    }
    dispatch(addCartPayMentTemp(productCheckOut));
  };

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
                // rowKey={record => record.}
                // onRow={(record, rowIndex) => {
                //   return {
                //     onClick: event => {
                //       return record.price * record.quantity;
                //     }
                //   };
                // }}
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
                <span>Shipping:</span>
                <span>0 $</span>
              </div>
              <div className="cart-total ">
                <span>Total:</span>
                <span style={{ color: "rgb(247,69,46)" }}>{total} $</span>
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
                  allowClear
                  enterButton="Check It"
                  size="large"
                  // onSearch={onSearch}
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
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 15 }}>
                    <Button type="primary" htmlType="submit">
                      Pay
                    </Button>
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
