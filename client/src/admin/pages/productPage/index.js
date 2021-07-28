import { Breadcrumb, Table, Input, Button, Tag, Space, Pagination } from "antd";
import React, { useState } from "react";
import "./product.css";
import { DeleteOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPageFilter } from "../../../app/filterSlice";

const { Search } = Input;

function ProductPage() {
  const { products } = useSelector((state) => state.products);
  const { productsFilter } = useSelector((state) => state.productsFilter);
  const [data, setData] = useState(productsFilter.slice(0, 3));
  const dispatch = useDispatch();

  const handleChangePage = (page, pageSize) => {
    dispatch(setPageFilter(page));
    setData(productsFilter.slice((page - 1) * pageSize, page * pageSize));
  };
  
  const columns = [
    {
      title: "STT",
      width: 40,
      key: "stt",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => (
        <a style={{ textTransform: "capitalize" }} href="/">
          {record.title}
        </a>
      ),
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (text, record, index) => (
        <img
          style={{ height: 40, width: 40 }}
          src={record.images.url}
          alt={record.title}
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "nameCategory",
      key: "nameCategory",
      render: (text, record, index) => <span>{record.nameCategory}</span>,
    },
    {
      title: "Sold",
      dataIndex: "numberSold",
      key: "numberSold",
      render: (text, record, index) => <span>{record.numberSold}</span>,
      //   defaultSortOrder: 'descend',
      sorter: (a, b) => a.numberSold - b.numberSold,
    },
    {
      title: "Amount",
      dataIndex: "storage",
      key: "storage",
      render: (text, record, index) => <span>{record.storage}</span>,
      //   defaultSortOrder: 'descend',
      sorter: (a, b) => a.storage - b.storage,
    },
    {
      title: "Sale",
      dataIndex: "sale",
      key: "sale",
      render: (text, record, index) => <span>{record.sale}%</span>,
      //   defaultSortOrder: 'descend',
      sorter: (a, b) => a.sale - b.sale,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record, index) => <span>{record.price}$</span>,
      //   defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "New Price",
      key: "newprice",
      render: (text, record, index) => (
        <span>
          {Math.floor(record.price - record.price * (record.sale / 100))}$
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => (
        <>
          <Tag color="green">{record.status}</Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <Link to="/">
            <EditOutlined />
          </Link>
          <Link to="/">
            <DeleteOutlined />
          </Link>
        </Space>
      ),
    },
  ];

  const onSearch = (values) => {
    console.log(values);
  };

  return (
    <div>
      <div className="header_page">
        <h3>Products</h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Products</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="product_data">
        <div className="product_data-header">
          <h3>Data Table Products</h3>
        </div>
        <div className="product_data-top">
          <div className="product_data-search">
            <Search
              placeholder="Search Product"
              allowClear
              enterButton="Search"
              size="middle"
              onSearch={onSearch}
            />
          </div>
          <div className="product_data-create">
            <Button type="primary">Create Product</Button>
          </div>
        </div>
        <div className="product_data-table">
          <Table
            pagination={{ position: ["none", "none"] }}
            columns={columns}
            dataSource={data}
          />
        </div>
        <div className="product_data-pagination">
          {productsFilter.length >= 0 && productsFilter.length < 3 ? (
            ""
          ) : (
            <Pagination
              defaultCurrent={1}
              total={products.length}
              showSizeChanger={false}
              pageSize={3}
              onChange={(page, pageSize) => handleChangePage(page, pageSize)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
