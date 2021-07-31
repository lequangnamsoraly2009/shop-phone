import { DeleteOutlined, EditOutlined, HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Input,
  Pagination,
  Popconfirm,
  Skeleton,
  Space,
  Table,
} from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { Search } = Input;

function MainCategory() {
  const { categories } = useSelector((state) => state.categories);
  console.log(categories);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 40,
      key: "stt",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "ID Category",
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => <span>{record._id}</span>,
      align: "center",
    },
    {
      title: "Name Category",
      dataIndex: "nameCategory",
      key: "nameCategory",
      render: (text, record, index) => (
        <a style={{ textTransform: "capitalize" }} href="/">
          {record.nameCategory}
        </a>
      ),
      align: "center",
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record, index) => <span>{new Date(record.createdAt).toLocaleString("en-GB")}</span>,
      align: "center",
    },
    {
        title: "Update At",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: (text, record, index) => <span>{new Date(record.updatedAt).toLocaleString("en-GB")}</span>,
        align: "center",
      },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="large">
          <Link
            to={`/admin/products/edit/${record._id}`}
            style={{ color: "rgb(25,144,255)", cursor: "pointer" }}
          >
            <EditOutlined />
          </Link>
          <div style={{ color: "rgb(25,144,255)", cursor: "pointer" }}>
            <Popconfirm
              title="Are you sure delete it?"
              // onConfirm={() =>
              //   handleDeleteProduct(record._id, record.images.public_id)
              // }
              // onCancel={handleCancelDeleteProduct}
              okText="Xóa mẹ nó đi"
              cancelText="Thôi đừng"
            >
              <DeleteOutlined />
            </Popconfirm>
          </div>
        </Space>
      ),
      align: "center",
    },
  ];
  return (
    <div className="container-admin">
      <div className="header_page">
        <h3>Categories</h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Category</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="product_data">
        <div className="product_data-header">
          <h3>Data Table Categories</h3>
        </div>
        <div className="product_data-wrapper">
          <div className="product_data-create">
            <Button type="primary">Reload Page</Button>
          </div>
          <div className="product_data-search">
            <Search
              placeholder="Search Product"
              allowClear
              enterButton="Search Category"
              size="middle"
              //   onSearch={onSearch}
            />
          </div>
          <div className="product_data-create">
            <Link to="/admin/products/create">
              <Button type="primary">New Category</Button>
            </Link>
          </div>
        </div>
        <div className="product_data-table">
          {/* <Skeleton
            active
            // loading={isLoading}
            paragraph={{ rows: 10 }}
            title={{ width: "100%" }}
          > */}
          <Table
            rowKey="_id"
            pagination={{ position: ["none", "none"] }}
            columns={columns}
            dataSource={categories.slice(0, 10)}
            // bordered={true}
          />
          {/* </Skeleton> */}
        </div>
        {/* <div className="product_data-pagination">
          {paginationFilter.length <= 10 ? (
            ""
          ) : (
            <Pagination
              defaultCurrent={1}
              total={paginationFilter.length}
              showSizeChanger={false}
              pageSize={10}
              onChange={(page, pageSize) => handleChangePage(page, pageSize)}
            />
          )}
        </div> */}
      </div>
    </div>
  );
}

export default MainCategory;
