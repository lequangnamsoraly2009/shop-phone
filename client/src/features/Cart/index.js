import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Space, Breadcrumb } from "antd";
import CartBanner from "./components/CartBanner";
import CartEmpty from "./components/CartEmpty";
import "./cart.css";
import { Link, useHistory } from "react-router-dom";
import {
  addCartPayMentTemp,
  removeOneCart,
  updateCart,
} from "../../app/cartSlice";
import API from "../../api/axiosClient";
import Swal from "sweetalert2";

function Cart() {
  const { carts, isLoadingCart } = useSelector((state) => state.carts);
  const { token } = useSelector((state) => state.token);
  const [total, setTotal] = useState(0);
  const [productChoice, setProductChoice] = useState(0);
  const [productCheckOut, setProductCheckOut] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  // console.log(productCheckOut)

  useEffect(() => {
    // const getTotal = () => {
    //   const totalPrice = carts.reduce((item1, item2) => {
    //     return item1 + item2.price * item2.quantity;
    //   }, 0);
    //   setTotal(totalPrice);
    // };
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
            <a style={{ textTransform: "capitalize" }} href={`/${record._id}`}>
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
      render: (text) => <span>{text} $</span>,
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
        <span>{record.price * record.quantity} $</span>
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
        return item1 + item2.price * item2.quantity;
      }, 0);
      setTotal(totalPrice);
      setProductChoice(selectedRows.length);
      setProductCheckOut(selectedRows);
    },
  };

  const sendPayMentCart = () => {
    if (productChoice === 0) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'You have not selected any products to pay! Please check again !',
        showConfirmButton: false,
        timer: 3000
      })
    }
    dispatch(addCartPayMentTemp(productCheckOut));
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
                <span>Shipping (Default):</span>
                <span>0 $</span>
              </div>
              <div className="cart-total ">
                <span>Total:</span>
                <span style={{ color: "rgb(247,69,46)" }}>{total} $</span>
              </div>
              <div className="cart-total ">
                <div style={{ margin: "20px auto 0px auto" }}>
                  {productChoice === 0 ? (
                    <>
                      <Link
                        className="btn"
                        style={{ backgroundColor: "rgb(230,246,255)" }}
                        to="/home/cart"
                        onClick={() => sendPayMentCart()}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        PayMent
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        className="btn"
                        style={{ backgroundColor: "rgb(230,246,255)" }}
                        to="/home/checkout"
                        onClick={() => sendPayMentCart()}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        PayMent
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
