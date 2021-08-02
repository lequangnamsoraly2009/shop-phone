import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Image, Avatar, Descriptions, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./detailUser.css";

function DetailUser() {
  const params = useParams();
  const { users } = useSelector((state) => state.usersAdmin);
  const [detailUser, setDetailUser] = useState({});

  const history = useHistory();

  const backPreviousPage = (e) => {
    e.preventDefault();
    history.goBack();
  };

  useEffect(() => {
    users.forEach((user) => {
      if (user._id === params.id) {
        setDetailUser(user);
      }
    });
  }, [params, users]);

  return (
    <div className="container-admin">
      <div className="header_page">
        <h3>
          <Button
            style={{ marginRight: 10 }}
            type="dashed"
            icon={<ArrowLeftOutlined />}
            onClick={backPreviousPage}
          />
          Detail Users
        </h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/users">Users</Breadcrumb.Item>
          <Breadcrumb.Item>Detail</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="product_data">
        <div className="product_data-header">
          <span style={{ fontSize: 20 }}>
            DETAIL USER OF{" "}
            <span style={{ fontWeight: 700 }}>{detailUser.email}</span>
          </span>
        </div>
        <div className="user_data-infor">
          <div className="user_data-infor-left">
            <div className="avatar-title">
              <span style={{ fontSize: 16 }}>User Avatar</span>
            </div>
            <div className="user_data-infor-avatar">
              <Avatar
                style={{ height: 300, width: 300, border: "1px solid #000" }}
                src={
                  <Image src="https://i.pinimg.com/474x/a7/b0/5e/a7b05eed960c1c288f05012082008f03.jpg" />
                }
              />
            </div>
          </div>
          <div className="user_data-infor-right">
            <Descriptions title="User Info">
              <Descriptions.Item
                style={{ textTransform: "capitalize" }}
                label="User Name"
              >
                {detailUser.userName}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {detailUser.email}
              </Descriptions.Item>
              <Descriptions.Item label="ID User">
                {detailUser._id}
              </Descriptions.Item>
              <Descriptions.Item label="Telephone">
                {detailUser.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Age">
                {detailUser.age}
              </Descriptions.Item>
              <Descriptions.Item label="Telephone">
                {detailUser.phone}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ textTransform: "capitalize" }}
                label="Gender"
              >
                {detailUser.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Type User">
                {detailUser.typeUser === "Unconfirmed" ? (
                  <span style={{ color: "gray" }}>{detailUser.typeUser}</span>
                ) : detailUser.typeUser === "Block" ? (
                  <span style={{ color: "red" }}>{detailUser.typeUser}</span>
                ) : (
                  <span style={{ color: "green" }}>{detailUser.typeUser}</span>
                )}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ textTransform: "capitalize" }}
                label="Introduction Of User"
              >
                {detailUser.introduction}
              </Descriptions.Item>
            </Descriptions>
            <div className="user_data-infor-right-change">
              <span>Action With This User</span>
              <div className="action">
                <Button type="primary">Change Type</Button>
                <Button type="primary">Send Notification</Button>
                <Button type="primary">Send Voucher</Button>
                <Button type="primary">Chat With User</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailUser;
