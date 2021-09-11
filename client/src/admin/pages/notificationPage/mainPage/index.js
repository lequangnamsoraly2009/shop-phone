import { DeleteOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Table,
  Input,
  Space,
  Popconfirm,
  Drawer,
  Skeleton,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationForAdmin } from "../../../../app/notificationSlice";
import Swal from "sweetalert2";
import NotificationAPI from "../../../../api/notificationAPI";

const Search = Input;

function NotificationMainPage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDrawerChild, setShowDrawerChild] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state.token);
  const { notifications } = useSelector((state) => state.notifications);

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
        timer: 4000,
      });
    }
  };

  const handleCancelDeleteCategory = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
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
              pagination={{ position: ["none", "none"] }}
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
        title="Multi-level drawer"
        width={520}
        closable={false}
        onClose={onCloseDrawer}
        visible={showDrawer}
      >
        <Button type="primary" onClick={() => setShowDrawerChild(true)}>
          Two-level drawer
        </Button>
        <Drawer
          title="Two-level Drawer"
          width={320}
          closable={false}
          onClose={onChildrenDrawerClose}
          visible={showDrawerChild}
        >
          This is two-level drawer
        </Drawer>
      </Drawer>
    </div>
  );
}

export default NotificationMainPage;
