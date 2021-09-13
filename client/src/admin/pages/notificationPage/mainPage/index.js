import {
  ArrowRightOutlined,
  DeleteOutlined,
  EyeOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Table,
  Input,
  Space,
  Popconfirm,
  Drawer,
  Skeleton,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationForAdmin } from "../../../../app/notificationSlice";
import Swal from "sweetalert2";
import NotificationAPI from "../../../../api/notificationAPI";

const Search = Input;
const { Option } = Select;

function NotificationMainPage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDrawerChild, setShowDrawerChild] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state.token);
  const { notifications } = useSelector((state) => state.notifications);
  const { users } = useSelector((state) => state.usersAdmin);
  // console.log(users);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getNotificationForAdmin({ token }));
    setIsLoading(false);
  }, [dispatch, token]);

  const handleDeleteNotification = async (_id) => {
    try {
      const response = await NotificationAPI.deleteNotification({
        token,
        idNotification: _id,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cancel",
        text: `${response.response.data.message}`,
        showConfirmButton: false,
        timer: 4000,
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cancel",
        text: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const handleCancelDeleteCategory = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "cancel",
      title: "Cancel",
      showConfirmButton: false,
      timer: 4000,
    });
  };

  const onCloseDrawer = () => {
    setShowDrawer(false);
  };

  const onChildrenDrawerClose = () => {
    setShowDrawerChild(false);
  };

  // Send 1 User
  const handleOnClickSendUser = async(userId) => {
    try {
      
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "cancel",
        title: "Notification!",
        text: `${error.response.data.message}`,
        showConfirmButton: false,
        timer: 4000,
      });
    }
  }

  // Send Some Users
  const handleSelectUser = (values) => {
    console.log(values)
  }

  // Send All Users
  const handleOnClickSendAll = () => {

  }

  const columnsListUser = [
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record, index) => <span>{record.email}</span>,
      align: "center",
    },
    {
      title: "Type User",
      dataIndex: "typeUser",
      key: "typeUser",
      render: (text, record, index) =>
        record.typeUser === "Confirmed" ? (
          <span style={{ color: "green" }}>{record.typeUser}</span>
        ) : record.typeUser === "Unconfirmed" ? (
          <span style={{ color: "red" }}>{record.typeUser}</span>
        ) : (
          <span style={{ color: "gray" }}>{record.typeUser}</span>
        ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="large">
          <ArrowRightOutlined
            style={{ cursor: "pointer", color: "rgb(25,144,255)" }}
            onClick={() => handleOnClickSendUser(record._id)}
          />
        </Space>
      ),
      align: "center",
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 40,
      key: "stt",
      render: (text, record, index) => (
        <span>{notifications.findIndex((x) => x._id === record._id) + 1}</span>
      ),
    },
    {
      title: "Title Notification",
      dataIndex: "notification",
      key: "notification",
      render: (text, record, index) => <span>{record.notification}</span>,
      align: "center",
    },
    {
      title: "Content Notification",
      dataIndex: "contentNotification",
      key: "contentNotification",
      render: (text, record, index) => (
        <span>{record.contentNotification}</span>
      ),
      align: "center",
    },
    {
      title: "Type Notification",
      dataIndex: "typeNotification",
      key: "typeNotification",
      render: (text, record, index) => <span>{record.typeNotification}</span>,
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="large">
          <EyeOutlined
            style={{ cursor: "pointer", color: "rgb(25,144,255)" }}
            onClick={() => setShowDrawer(true)}
          />
          <div style={{ color: "rgb(25,144,255)", cursor: "pointer" }}>
            <Popconfirm
              title="Are you sure delete it?"
              onConfirm={() => handleDeleteNotification(record._id)}
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
        <h3>Notification</h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Notification</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="product_data">
        <div className="product_data-header">
          <h3>List Notification</h3>
        </div>
        <div className="product_data-wrapper">
          <div className="product_data-create">
            <Button type="primary">Reload Page</Button>
          </div>
          <div className="product_data-search">
            <Search
              placeholder="Search Order"
              allowClear
              enterButton="Search Order"
              size="middle"
              //   onSearch={onSearch}
            />
          </div>
          <div className="product_data-create">
            <Button type="primary">
              <Link to="/admin/notification/create">Create Notification</Link>
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
              // pagination={{ position: ["none", "none"] }}
              columns={columns}
              dataSource={notifications}
            />
          </Skeleton>
        </div>
        {/* <div className="product_data-pagination">
          {paginationPayments.length <= 10 ? (
            ""
          ) : (
            <Pagination
              defaultCurrent={1}
              total={paginationPayments.length}
              showSizeChanger={false}
              pageSize={10}
              onChange={(page, pageSize) => handleChangePage(page, pageSize)}
            />
          )}
        </div> */}
      </div>
      <Drawer
        title="Notification For User"
        width={800}
        closable={false}
        onClose={onCloseDrawer}
        visible={showDrawer}
      >
        <Table
          rowKey="_id"
          // pagination={{ position: ["none", "none"] }}
          columns={columnsListUser}
          dataSource={users}
        />
        <Button type="primary" style={{ margin: "30px 40px 0 0" }} onClick={handleOnClickSendAll}>
          Send All
        </Button>
        <Button type="primary" onClick={() => setShowDrawerChild(true)}>
          Send Some Users
        </Button>
        <Drawer
          title="Send Some Users"
          width={500}
          closable={false}
          onClose={onChildrenDrawerClose}
          visible={showDrawerChild}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select users"
            onChange={handleSelectUser}
            optionLabelProp="label"
          >
            {users.map((user) => (
              <Option key={user._id} label={user.email} value={user._id}>
                Email: {user.email} - Type: {user.typeUser}
              </Option>
            ))}
          </Select>
        </Drawer>
      </Drawer>
    </div>
  );
}

export default NotificationMainPage;
