import {
  Breadcrumb,
  Table,
  Input,
  Button,
  Tag,
  Space,
  Pagination,
  Popconfirm,
  Skeleton,
} from "antd";
import React, { useEffect, useState } from "react";
import "./product.css";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsFilter,
  getProductsFilter,
  setPaginationFilter,
  setSearchFilter,
} from "../../../../../app/productSlice";
import API from "../../../../../api/axiosClient";
import Swal from "sweetalert2";
import ProductFilterAPI from "../../../../../api/productAPI";

const { Search } = Input;

function MainProduct() {
  const {
    productsFilter,
    categoryFilter,
    sortFilter,
    pageFilter,
    searchFilter,
    paginationFilter,
  } = useSelector((state) => state.productsFilter);
  const { token } = useSelector((state) => state.token);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllProductsFilter({
        categoryFilter: "",
        sortFilter: "",
        searchFilter: "",
        pageFilter,
      })
    );
  }, [dispatch, categoryFilter, searchFilter, pageFilter, sortFilter]);

  // When turning pages, run this function
  const handleChangePage = async (page, pageSize) => {
    try {
      setIsLoading(true);
      const response = await ProductFilterAPI.getAllProductsFilter({
        categoryFilter,
        sortFilter,
        searchFilter,
        pageFilter: page,
      });
      dispatch(setPaginationFilter(response.data.products));
      const data = response.data.products.slice(
        (page - 1) * pageSize,
        page * pageSize
      );
      dispatch(getProductsFilter(data));
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  //   When user press F5 or refresh page
  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type === 1) {
        dispatch(setSearchFilter(""));
      }
    }
  }, [dispatch]);

  const onSearch = (values) => {
    dispatch(
      getAllProductsFilter({
        categoryFilter,
        sortFilter,
        searchFilter: values.toLowerCase(),
        pageFilter,
      })
    );
  };

  const handleOnclickReload = (e) => {
    e.preventDefault();
    dispatch(
      getAllProductsFilter({
        categoryFilter: "",
        sortFilter: "",
        searchFilter: "",
        pageFilter,
      })
    );
    window.location.reload();
  };

  const handleDeleteProduct = async (
    _id,
    images,
    thumbnail1,
    thumbnail2,
    thumbnail3,
    thumbnail4
  ) => {
    try {
      setIsLoading(true);
      const imagesProduct = API.post("/api/admin/delete-all-image", {
        images,
        thumbnail1,
        thumbnail2,
        thumbnail3,
        thumbnail4,
      });
      const deleteProduct = API.delete(`/api/admin/products/${_id}`, {
        headers: { Authorization: token },
      });
      await imagesProduct;
      await deleteProduct;
      setIsLoading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete Product Successful",
        showConfirmButton: false,
        timer: 4000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 4000);
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

  const handleCancelDeleteProduct = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Ok Không sao. Chúa phù hộ em :v",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // Hide Products 
  const handleHideProduct = () => {
    try {
      
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong!",
        text: `${error.response.data.message}` ,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  const handleCancelHideProduct = (e) =>{
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Ok Không sao. Chúa phù hộ em :v",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 40,
      key: "stt",
      render: (text, record, index) => (
        <span>
          {paginationFilter.findIndex((x) => x._id === record._id) + 1}
        </span>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => (
        <a style={{ textTransform: "capitalize" }} href="/">
          {record.title}
        </a>
      ),
      align: "center",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (text, record, index) => (
        <img
          style={{ height: 40, width: 40, objectFit: "scale-down" }}
          src={record.images?.url}
          alt={record?.title}
        />
      ),
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "nameCategory",
      key: "nameCategory",
      render: (text, record, index) => <span>{record.nameCategory}</span>,
      align: "center",
    },

    {
      title: "Sold",
      dataIndex: "numberSold",
      key: "numberSold",
      render: (text, record, index) => <span>{record.numberSold}</span>,
      sorter: (a, b) => a.numberSold - b.numberSold,
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "storage",
      key: "storage",
      render: (text, record, index) => <span>{record.storage}</span>,
      sorter: (a, b) => a.storage - b.storage,
      align: "center",
    },
    {
      title: "Sale",
      dataIndex: "sale",
      key: "sale",
      render: (text, record, index) => <span>{record.sale}%</span>,
      sorter: (a, b) => a.sale - b.sale,
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record, index) => <span>{record.price}$</span>,
      sorter: (a, b) => a.price - b.price,
      align: "center",
    },
    {
      title: "New Price",
      key: "newprice",
      render: (text, record, index) => (
        <span>
          {Math.floor(record.price - record.price * (record.sale / 100))}$
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
          <Tag color="green">{record.status}</Tag>
        </>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="large">
          <Popconfirm
            title="Are You Hide Product?"
            onConfirm={handleHideProduct}
            onCancel={handleCancelHideProduct}
            okText="Yes"
            cancelText="No"
          >
            <EyeOutlined style={{ color: "rgb(25,144,255)", cursor: "pointer" }} />
          </Popconfirm>
          <Link
            to={`/admin/products/edit/${record._id}`}
            style={{ color: "rgb(25,144,255)", cursor: "pointer" }}
          >
            <EditOutlined />
          </Link>
          <div style={{ color: "rgb(25,144,255)", cursor: "pointer" }}>
            <Popconfirm
              title="Are you sure delete it?"
              onConfirm={() =>
                handleDeleteProduct(
                  record._id,
                  record.images.public_id,
                  record.thumbnail1.public_id,
                  record.thumbnail2.public_id,
                  record.thumbnail3.public_id,
                  record.thumbnail4.public_id
                )
              }
              onCancel={handleCancelDeleteProduct}
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
        <h3>Products</h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Products</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="product_data">
        <div className="product_data-header">
          <h3>Data Table Products</h3>
        </div>
        <div className="product_data-wrapper">
          <div className="product_data-create">
            <Button onClick={handleOnclickReload} type="primary">
              Reload Page
            </Button>
          </div>
          <div className="product_data-search">
            <Search
              placeholder="Search Product"
              allowClear
              enterButton="Search"
              size="middle"
              onSearch={onSearch}
            />
          </div>
          <div className="product_data-create">
            <Link to="/admin/products/create">
              <Button type="primary">Create Product</Button>
            </Link>
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
              pagination={{ position: ["none", "none"] }}
              columns={columns}
              dataSource={productsFilter.slice(0, 10)}
              bordered={true}
              style={{ border: "1px solid #000" }}
            />
          </Skeleton>
        </div>
        <div className="product_data-pagination">
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
        </div>
      </div>
    </div>
  );
}

export default MainProduct;
