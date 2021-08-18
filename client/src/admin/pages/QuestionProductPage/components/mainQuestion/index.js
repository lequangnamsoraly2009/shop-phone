import {
  Breadcrumb,
  Table,
  Button,
  Pagination,
  Skeleton,
  Tag,
  Space,
  Popconfirm,
} from "antd";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPendingQuestionProducts,
  setPaginationPendingQuestionProducts,
} from "../../../../../app/pendingQuestionProductSlice";
import PendingQuestionProductAPI from "../../../../../api/pendingQuestionProductAPI";

function MainQuestionProduct() {
  const { token } = useSelector((state) => state.token);
  const { pendingQuestionProducts, paginationPendingQuestionProducts } =
    useSelector((state) => state.pendingQuestionProducts);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      setIsLoading(true);
      dispatch(getAllPendingQuestionProducts({ token }));
      setIsLoading(false);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [dispatch, token]);

  // Change Page
  const handleChangePage = async (page, pageSize) => {
    try {
      setIsLoading(true);
      const response =
        await PendingQuestionProductAPI.getPendingQuestionProductsByPage({
          page,
          pageSize,
          token,
        });
      const dataPage = response.data.pendingQuestions.slice(
        (page - 1) * pageSize,
        pageSize * page
      );
      dispatch(setPaginationPendingQuestionProducts(dataPage));
      setIsLoading(false);
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

  // Cancel Delete Pending Question Products
  const handleCancelDeletePendingQuestion = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cancel Delete !",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // Onsubmit Delete Pending Questions

  const handleDeletePendingQuestion = async (_id) => {
    try {
      setIsLoading(true);
      await PendingQuestionProductAPI.deletePendingQuestionProduct({
        _id,
        token,
      });
      setIsLoading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete Pending Question Success !",
        showConfirmButton: false,
        timer: 2000,
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 60,
      key: "stt",
      render: (text, record, index) => (
        <span>
          {pendingQuestionProducts.findIndex((x) => x._id === record._id) + 1}
        </span>
      ),
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
      title: "Question",
      dataIndex: "question",
      key: "question",
      width: "45%",
      ellipsis: true,
      render: (text, record, index) => (
        <span style={{ textTransform: "capitalize" }}>{record.question}</span>
      ),
      align: "center",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record, index) => (
        <span style={{ textTransform: "capitalize" }}>
          {new Date(record.createdAt).toLocaleString("en-GB")}
        </span>
      ),
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => (
        <>
          <Tag color="green" style={{ textTransform: "capitalize" }}>
            {record.status}
          </Tag>
        </>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="large">
          <Link
            to={`/admin/question-product/show/${record._id}`}
            style={{ color: "rgb(25,144,255)", cursor: "pointer" }}
          >
            <EyeOutlined />
          </Link>
          <div style={{ color: "rgb(25,144,255)", cursor: "pointer" }}>
            <Popconfirm
              title="Are you sure delete it?"
              onConfirm={() => handleDeletePendingQuestion(record._id)}
              onCancel={handleCancelDeletePendingQuestion}
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
        <h3>Product Questions</h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Products Questions</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="product_data">
        <div className="product_data-header">
          <h3> Total Questions About Product</h3>
        </div>

        <div className="product_data-table">
          <Skeleton
            active
            loading={isLoading}
            paragraph={{ rows: 10 }}
            title={{ width: "100%" }}
          >
            <Table
              pagination={{ position: ["none", "none"] }}
              columns={columns}
              rowKey="_id"
              dataSource={paginationPendingQuestionProducts}
              bordered="true"
              style={{ border: "1px solid #000" }}
            />
          </Skeleton>
        </div>
        <div className="product_data-pagination">
          {pendingQuestionProducts.length <= 10 ? (
            ""
          ) : (
            <Pagination
              defaultCurrent={1}
              total={pendingQuestionProducts.length}
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

export default MainQuestionProduct;
