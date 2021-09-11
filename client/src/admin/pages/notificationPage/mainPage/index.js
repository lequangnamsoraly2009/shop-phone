import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Table, Input } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationForAdmin } from "../../../../app/notificationSlice";

const Search = Input;

function NotificationMainPage() {
  const { token } = useSelector((state) => state.token);
  const { notifications } = useSelector((state) => state.notifications);

  console.log(notifications);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationForAdmin({ token }));
  }, [dispatch, token]);

  const columns = [
    {
      title: "Title Notification",
      dataIndex: "notification",
      key: "notification",
      render: (text, record, index) => {
        <span>{record.notification}</span>
      },
      align: "center",
    },
    {
      title: "Content Notification",
      dataIndex: "contentNotification",
      key: "contentNotification",
      render: (text, record, index) => {
        <span>{record.contentNotification}</span>
      },
      align: "center",
    },
    {
      title: "Title Notification",
      dataIndex: "notification",
      key: "notification",
      render: (text, record, index) => {
        <span>{record.notification}</span>
      },
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
          {/* <Skeleton
            active
            loading={isLoading}
            paragraph={{ rows: 10 }}
            title={{ width: "100%" }}
          > */}
          <Table
            style={{ border: "1px solid #000" }}
            rowKey="_id"
            pagination={{ position: ["none", "none"] }}
            columns={columns}
            dataSource={notifications}
          />
          {/* </Skeleton> */}
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
    </div>
  );
}

export default NotificationMainPage;
