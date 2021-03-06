import { EyeOutlined, HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Skeleton,
  Table,
  Input,
  Space,
  Pagination,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllAdminUsers,
  getAllUsers,
  setPaginationUsers,
  setSearchUsers,
} from "../../../../../app/userSlice.admin";
import UserAPI from "../../../../../api/userAPI";

const { Search } = Input;

function MainUser() {
  const { users, searchUsers, paginationUsers } = useSelector(
    (state) => state.usersAdmin
  );

  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllAdminUsers({ searchUsers, token }));
  }, [dispatch, token, searchUsers]);

  // Reload Page
  const handleOnclickReload = (e) => {
    e.preventDefault();
    dispatch(setSearchUsers(""));
    window.location.reload();
  };

  //   When user press F5 or refresh page
  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type === 1) {
        dispatch(setSearchUsers(""));
      }
    }
  }, [dispatch]);

  const onSearch = async (value) => {
    dispatch(setSearchUsers(value.toLowerCase()));
    dispatch(getAllAdminUsers({ searchUsers: value.toLowerCase(), token }));
  };

  // Change Page Here
  const handleChangePage = async (page, pageSize) => {
    try {
      setIsLoading(true);
      const response = await UserAPI.getUsersPagination({
        searchUsers,
        page,
        token,
      });
      const responseFilter = response.data.users.filter(
        (user) => user.role !== 1
      );
      dispatch(setPaginationUsers(responseFilter));
      // xét data categories khi change page
      const data = responseFilter.slice((page - 1) * pageSize, page * pageSize);
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
        <span>
          {paginationUsers.findIndex((x) => x._id === record._id) + 1}
        </span>
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
      render: (text, record, index) => <span>{record.email}</span>,
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "typeUser",
      key: "typeUser",
      render: (text, record, index) => (
        <>
          {record.typeUser === "Confirmed" ? (
            <span style={{ textTransform: "capitalize", color: "green" }}>
              {record.typeUser}
            </span>
          ) : record.typeUser === "Block" ? (
            <span style={{ textTransform: "capitalize", color: "red" }}>
              {record.typeUser}
            </span>
          ) : (
            <span style={{ textTransform: "capitalize", color: "gray" }}>
              {record.typeUser}
            </span>
          )}
        </>
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
      render: (text, record, index) =>
        record.phone ? (
          <span>
            +{record.prefix}
            {record.phone.slice(1)}
          </span>
        ) : (
          <span>
            None
          </span>
        ),
      align: "center",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (text, record, index) => (
        record.age ? (<span style={{ textTransform: "capitalize" }}>{record.age}</span>) : (<span style={{ textTransform: "capitalize" }}>Unknown</span>)
        
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
              placeholder="Search Email User"
              allowClear
              enterButton="Search User"
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
              style={{ border: "1px solid #000" }}
              bordered
              showHeader
              rowKey="_id"
              pagination={{ position: ["none", "none"] }}
              columns={columns}
              dataSource={users}
            />
          </Skeleton>
        </div>
        <div className="product_data-pagination">
          {paginationUsers.length <= 10 ? (
            ""
          ) : (
            <Pagination
              defaultCurrent={1}
              total={paginationUsers.length}
              showSizeChanger={false}
              pageSize={10}
              onChange={(page, pageSize) => handleChangePage(page, pageSize)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MainUser;
