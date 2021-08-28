import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import UserAPI from "../../../../../api/userAPI";
import VoucherAPI from "../../../../../api/voucherAPI";
import Swal from "sweetalert2";
import "./detailVoucher.css";

function DetailVoucher() {
  const history = useHistory();

  const params = useParams();

  const { token } = useSelector((state) => state.token);
  const { vouchers } = useSelector((state) => state.vouchers);

  const [listUsers, setListUsers] = useState([]);
  // const [onAction, setOnAction] = useState(false);
  // const [idAction, setIdAction] = useState("");

  const handOnClickAction = async (_id) => {
    // setOnAction(true);
    // setIdAction(_id);
    try {
      const userNeed = listUsers.filter((user) => user._id === _id);
      const voucherSend = vouchers.filter(
        (voucher) => voucher._id === params.id
      );
      await VoucherAPI.sendVoucher({
        token,
        user: userNeed[0],
        voucher: voucherSend[0],
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Nice Send!",
        // text: `${response.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {}
  };

  useEffect(() => {
    const getDataListUsers = async () => {
      try {
        const searchUsers = "";
        const listUsers = await UserAPI.getAllUsers({ token, searchUsers });

        const responseListUsersFilter = listUsers.data.users.filter(
          (user) => user.role !== 1
        );
        setListUsers(responseListUsersFilter);
      } catch (error) {}
    };
    getDataListUsers();
  }, [token]);

  const backPreviousPage = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleOnClickSendVoucher = () => {};

  const columnListUsers = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 40,
      key: "stt",
      render: (text, record, index) => (
        <span>{listUsers.findIndex((x) => x._id === record._id) + 1}</span>
      ),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: (text, record, index) => <span>{record.userName}</span>,
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
      title: "Type User",
      dataIndex: "typeUser",
      key: "typeUser",
      render: (text, record, index) => (
        <>
          {record.typeUser === "Unconfimred" ? (
            <span style={{ textTransform: "capitalize", color: "red" }}>
              {record.typeUser}
            </span>
          ) : record.typeUser === "Block" ? (
            <span style={{ textTransform: "capitalize", color: "gray" }}>
              {record.typeUser}
            </span>
          ) : (
            <span style={{ textTransform: "capitalize", color: "green" }}>
              {record.typeUser}
            </span>
          )}
        </>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="large">
          <div style={{ color: "rgb(25,144,255)", cursor: "pointer" }}>
            <ArrowRightOutlined onClick={() => handOnClickAction(record._id)} />
          </div>
        </Space>
      ),
      align: "center",
    },
  ];

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
          Detail Voucher
        </h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/products">Voucher</Breadcrumb.Item>
          <Breadcrumb.Item>
            {/* {!onEdit ? "Create" : "Update"} Product */}
            Detail Voucher
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="voucher_detail-main">
        <div className="voucher_detail-left">
          <div className="voucher_detail-left-header">
            <span>List Users</span>
          </div>
          <div className="voucher_detail-left-table">
            <Table
              dataSource={listUsers}
              rowKey={(record) => record._id}
              columns={columnListUsers}
              bordered={true}
            />
          </div>
        </div>
        <div className="voucher_detail-right">
          <div className="voucher_detail-right-header">
            <span>Actions</span>
          </div>
          <div className="voucher_detail-right-table">
            <Button
              type="primary"
              block
              onClick={() => handleOnClickSendVoucher()}
            >
              Send Voucher
            </Button>
            <Button type="primary" block>
              Cleaning Up
            </Button>
            <Button block>Cleaning Up</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailVoucher;
