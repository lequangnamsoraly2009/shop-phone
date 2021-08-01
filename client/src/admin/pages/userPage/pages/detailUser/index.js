import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Image,Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./detailUser.css";

function DetailUser() {
  const params = useParams();
  const { users } = useSelector((state) => state.usersAdmin);
  const [detailUser, setDetailUser] = useState({});

  useEffect(() => {
    users.forEach((user) => {
      if (user._id === params.id) {
        setDetailUser(user);
      }
    });
  }, [params, users]);

  console.log(detailUser);

  return (
    <div className="container-admin">
      <div className="header_page">
        <h3>Detail Users</h3>
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
              <div className="user_data-infor-">

              </div>
            <div className="user_data-infor-avatar">
              <Avatar style={{height: 300, width:300, border: "1px solid #000"}}
                src={
                  <Image src="https://i.pinimg.com/474x/a7/b0/5e/a7b05eed960c1c288f05012082008f03.jpg" />
                }
              />
            </div>
          </div>
          <div className="product_data-infor-right">
            <span>Hi Right</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailUser;
