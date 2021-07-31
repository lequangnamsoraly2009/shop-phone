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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../../../../api/axiosClient";
import {
  getCategories,
  setPaginationCategories,
  setSearchCategories,
} from "../../../../../app/categorySlice";

const { Search } = Input;

function MainCategory() {
  const { categories,searchCategories,paginationCategories } = useSelector(
    (state) => state.categories
  );
  const { token } = useSelector((state) => state.token);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // Reload Page
  const handleOnclickReload = (e) => {
    e.preventDefault();
    dispatch(setSearchCategories(""));
    window.location.reload();
  };
  // Search Categories Here
  const onSearch = async (value) => {
    dispatch(setSearchCategories(value.toLowerCase()));
    const response = await API.get(
      `/api/category?limit=${20}&&&nameCategorySearch[regex]=${searchCategories}`
    );
    dispatch(getCategories(response.data.categories));
  };
  // Delete Categories
  const handleDeleteProduct = async (_id) => {
    try {
      setIsLoading(true);
      await API.delete(`/api/admin/products/${_id}`, {
        headers: { Authorization: token },
      });
      setIsLoading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete Category Successful",
        showConfirmButton: false,
        timer: 4000,
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something wrongs. Please try it again !",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  // Cancel Delete Category
  const handleCancelDeleteCategory = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Ok Không sao. Chúa phù hộ em :v",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // Columns Table Category -> Có thể tách ra 1 file riêng nhưng viết chung luôn cho dễ quản lý
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
      render: (text, record, index) => (
        <span>{new Date(record.createdAt).toLocaleString("en-GB")}</span>
      ),
      align: "center",
    },
    {
      title: "Update At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text, record, index) => (
        <span>{new Date(record.updatedAt).toLocaleString("en-GB")}</span>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="large">
          <Link
            to={`/admin/categories/edit/${record._id}`}
            style={{ color: "rgb(25,144,255)", cursor: "pointer" }}
          >
            <EditOutlined />
          </Link>
          <div style={{ color: "rgb(25,144,255)", cursor: "pointer" }}>
            <Popconfirm
              title="Are you sure delete it?"
              onConfirm={() => handleDeleteProduct(record._id)}
              onCancel={handleCancelDeleteCategory}
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
            <Button onClick={handleOnclickReload} type="primary">
              Reload Page
            </Button>
          </div>
          <div className="product_data-search">
            <Search
              placeholder="Search Product"
              allowClear
              enterButton="Search Category"
              size="middle"
              onSearch={onSearch}
            />
          </div>
          <div className="product_data-create">
            <Link to="/admin/categories/create">
              <Button type="primary">New Category</Button>
            </Link>
          </div>
        </div>
        <div className="product_data-table">
          <Skeleton
            active
            loading={isLoading}
            paragraph={{ rows: 10 }}
            title={{ width: "100%" }}
          >
            <Table
              rowKey="_id"
              pagination={{ position: ["none", "none"] }}
              columns={columns}
              dataSource={categories.slice(0,10)}
              // bordered={true}
            />
          </Skeleton>
        </div>
        <div className="product_data-pagination">
          {/* {paginationFilter.length <= 10 ? (
            ""
          ) : (
            <Pagination
              defaultCurrent={1}
              total={paginationFilter.length}
              showSizeChanger={false}
              pageSize={10}
              // onChange={(page, pageSize) => handleChangePage(page, pageSize)}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default MainCategory;
