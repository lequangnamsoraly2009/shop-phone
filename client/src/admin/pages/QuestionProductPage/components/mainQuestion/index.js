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
import React, { useEffect } from "react";
import { DeleteOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPendingQuestionProducts } from "../../../../../app/pendingQuestionProductSlice";

function MainQuestionProduct() {
  const { token } = useSelector((state) => state.token);
  const { pendingQuestionProducts } = useSelector(
    (state) => state.pendingQuestionProducts
  );

  const dispatch = useDispatch();


  useEffect(() => {
    try {
      dispatch(getAllPendingQuestionProducts({ token }));
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch, token]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 40,
      key: "stt",
      render: (text, record, index) => (
        <span>
          {/* {paginationFilter.findIndex((x) => x._id === record._id) + 1} */}
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
        <span style={{ textTransform: "capitalize" }}>{new Date(record.createdAt).toLocaleString("en-GB")}</span>
      ),
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => (
        <>
          <Tag color="green" style={{ textTransform: "capitalize" }}>{record.status}</Tag>
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
              //   onConfirm={() =>
              //     handleDeleteProduct(record._id, record.images.public_id)
              //   }
              //   onCancel={handleCancelDeleteProduct}
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
        <div className="product_data-wrapper">
          <div className="product_data-create">
            <Button type="primary">Reload Page</Button>
          </div>
        </div>
        <div className="product_data-table">
          {/* <Skeleton
              active
              // loading={isLoading}
              paragraph={{ rows: 10 }}
              title={{ width: "100%" }}
            > */}
          <Table
            pagination={{ position: ["none", "none"] }}
            columns={columns}
            dataSource={pendingQuestionProducts}
            bordered={true}
            style={{ border: "1px solid #000" }}
          />
          {/* </Skeleton> */}
        </div>
        {/* <div className="product_data-pagination">
            {paginationFilter.length <= 10 ? (
              ""
            ) : (
              <Pagination
                defaultCurrent={1}
                total={paginationFilter.length}
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

export default MainQuestionProduct;
