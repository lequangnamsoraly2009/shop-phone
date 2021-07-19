import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Space } from "antd";
import CartBanner from "./components/CartBanner";
import CartEmpty from "./components/CartEmpty";
import "./cart.css";
import { updateCart } from "../../app/cartSlice";

function Cart() {
  const { carts, isLoadingCart } = useSelector((state) => state.carts);
  const [total, setTotal] = useState(0);
  const [productChoice, setProductChoice] = useState(0);

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

  const dispatch = useDispatch();

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
      render: (text, image) => (
        <>
          <div className="cart-product-infor">
            <img src={image.images.url} alt="hi" />
            <a style={{ textTransform: "capitalize" }} href="/">
              {text}
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
            <button>-</button>
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
          <Tag color="green" key={tags}>
            {tags}
          </Tag>
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
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a href="/">Delete</a>
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
    },
  };

  return (
    <div className="container-fluid">
      <div className="cart-full-wrapper">
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
              />
            </div>
          </div>
          <div className="cart-total-price">
            <div className="cart-total-1">
              <span>Total Price ({productChoice} products) :</span>
              <span style={{ color: "rgb(25,144,255)" }}>{total} $</span>
            </div>
            <div className="cart-total-2">
              <div>
                <a
                  className="btn"
                  style={{ backgroundColor: "rgb(230,246,255)" }}
                  href="/payment"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  PayMent
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;