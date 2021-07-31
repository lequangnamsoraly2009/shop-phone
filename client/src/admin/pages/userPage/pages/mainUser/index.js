import { EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Skeleton, Table, Input, Space, Pagination } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllUsers,
  setPaginationUsers,
  setSearchUsers,
} from "../../../../../app/userSlice.admin";
import API from "../../../../../api/axiosClient";

const { Search } = Input;

function MainUser() {
  const { users, searchUsers, paginationUsers } = useSelector(
    (state) => state.usersAdmin
  );

  const {token} = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // Reload Page
  const handleOnclickReload = (e) => {
    e.preventDefault();
    dispatch(setSearchUsers(""));
    window.location.reload();
  };

  // Search Categories Here
  const onSearch = async (value) => {
    dispatch(setSearchUsers(value.toLowerCase()));
    const response = await API.get(
      `/users/all_users?limit=${20}&&&email[regex]=${searchUsers}`,{
          headers: { Authorization: token }
      }
    );
    dispatch(getAllUsers(response.data.users));
    dispatch(setPaginationUsers(response.data.users));
  };

   // Change Page Here
   const handleChangePage = async (page, pageSize) => {
    try {
      setIsLoading(true);
      const response = await API.get(
        `/users/all_users?limit=${20}&&&email[regex]=${searchUsers}`,{
            headers: { Authorization: token }
        }
      );
      dispatch(setPaginationUsers(response.data.users));
      // xét data categories khi change page
      const data = response.data.users.slice(
        (page - 1) * pageSize,
        page * pageSize
      );
      dispatch(getAllUsers(data));
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  // Columns Table Category -> Có thể tách ra 1 file riêng nhưng viết chung luôn cho dễ quản lý
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 40,
      key: "stt",
      render: (text, record, index) => (
        <span>{users.findIndex((x) => x._id === record._id) + 1}</span>
      ),
    },
    {
      title: "ID User",
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => <span>{record._id}</span>,
      align: "center",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (text, record, index) => (
        <span style={{ textTransform: "capitalize" }}>{record.userName}</span>
      ),
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record, index) => (
        <span >{record.email}</span>
      ),
      align: "center",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text, record, index) => (
        <span style={{ textTransform: "capitalize" }}>{record.gender}</span>
      ),
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text, record, index) => <span>+{record.prefix}{record.phone.slice(1)}</span>,
      align: "center",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (text, record, index) => (
        <span style={{ textTransform: "capitalize" }}>{record.age}</span>
      ),
      sorter: (a, b) => a.age - b.age,

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
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="large">
          <Link
            to={`/admin/users/${record._id}`}
            style={{ color: "rgb(25,144,255)", cursor: "pointer" }}
          >
            <EyeOutlined />
          </Link>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <div className="container-admin">
      <div className="header_page">
        <h3>Users</h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Users</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="product_data">
        <div className="product_data-header">
          <h3>Data Table Users</h3>
        </div>
        <div className="product_data-wrapper">
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
            <Button onClick={handleOnclickReload} type="primary">
              Reload Page
            </Button>
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
              dataSource={users.slice(0,2)}
            />
          </Skeleton>
        </div>
        <div className="product_data-pagination">
          {paginationUsers.length <= 2 ? (
            ""
          ) : (
            <Pagination
              defaultCurrent={1}
              total={paginationUsers.length}
              showSizeChanger={false}
              pageSize={2}
              onChange={(page, pageSize) => handleChangePage(page, pageSize)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MainUser;