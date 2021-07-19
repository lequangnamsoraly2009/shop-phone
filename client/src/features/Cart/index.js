import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Tag, Space } from "antd";
import CartBanner from "./components/CartBanner";
import CartEmpty from "./components/CartEmpty";
import "./cart.css";

function Cart() {
  const { carts } = useSelector((state) => state.carts);
  const [total,setTotal]  = useState(0);
  const [productChoice, setProductChoice] = useState(0);

  if (carts.length === 0) {
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
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => (
        <>
          <div className="cart-amount">
            <button>-</button>
            <input
              className="cart-amount-input"
              readOnly
              type="text"
              value={quantity}
            />
            <button>+</button>
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
      //   dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price, quantity) => (
        <span>{price.price * quantity.quantity} $</span>
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

  const data = [
    {
      key: "1",
      status: "Stocking",
      checked: false,
      numberSold: 0,
      sale: 0,
      _id: "60f191a9fd8d832a8952b14e",
      product_id: "IP6",
      title: "iphone6",
      price: 300,
      description: "this is iphone 6",
      color: "black",
      images: {
        url: "https://www.gravatar.com/avatar/f2c683e7dc0c4d4bcc790f87eaa67301?s=32&d=identicon&r=PG",
      },
      category: "Iphone",
      storage: 100,
      __v: 0,
      quantity: 5,
    },
    {
      key: "2",
      status: "Stocking",
      checked: false,
      numberSold: 0,
      sale: 0,
      _id: "60f191a9fd8d832a8952b14e",
      product_id: "IP6",
      title: "iphone6",
      price: 300,
      description: "this is iphone 6",
      color: "black",
      images: {
        url: "https://www.gravatar.com/avatar/f2c683e7dc0c4d4bcc790f87eaa67301?s=32&d=identicon&r=PG",
      },
      category: "Iphone",
      storage: 100,
      __v: 0,
      quantity: 5,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const totalPrice = selectedRows.reduce((item1, item2) => {
        return item1 + item2.price * item2.quantity;
      }, 0);
      setTotal(totalPrice);
      setProductChoice(selectedRows.length)
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
                dataSource={data}
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
                  style={{ backgroundColor: "rgb(230,246,255)"}}
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
