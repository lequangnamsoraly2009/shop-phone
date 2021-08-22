import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Row, Select, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./detailProduct.css";
import CardItem from "../../components/CardItem";
import Swal from "sweetalert2";
import { addCart } from "../../../../app/cartSlice";
import API from "../../../../api/axiosClient";
import { getAllProducts } from "../../../../app/productSlice";
import MobileSystem from "./components/system";
import Evalution from "./components/Evalution";
import QuestionAndAnswers from "./components/Question";
import Reviews from "./components/Reviews";
import Rating from "../../../../components/Rating";
import io from "socket.io-client";

const { Option } = Select;
const { TabPane } = Tabs;

function DetailProduct() {
  const [detailProduct, setDetailProduct] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState("");
  const [image, setImage] = useState("");
  const [socket, setSocket] = useState(null);

  const dispatch = useDispatch();

  const { productsFilter, products } = useSelector(
    (state) => state.productsFilter
  );
  const { token } = useSelector((state) => state.token);
  const { carts } = useSelector((state) => state.carts);
  const { categories } = useSelector((state) => state.categories);
  const params = useParams();

  // Socket Config

  useEffect(() => {
    const socket = io();
    setSocket(socket);
    return () => socket.close();
  }, []);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailProduct(product);
          setImage(product?.images?.url);
        }
      });
    }
    categories.forEach((item) => {
      if (item._id === detailProduct.category) {
        setCategoryDetail(item.nameCategory);
      }
    });
  }, [
    params,
    dispatch,
    productsFilter,
    categories,
    products,
    detailProduct.category,
  ]);

  const onClickShowImage = (e, src) => {
    e.preventDefault();
    setImage(src);
  };

  const addCartItem = async () => {
    const checkItem = carts.every((item) => {
      return item._id !== detailProduct._id;
    });
    if (checkItem) {
      const newCart = {
        ...detailProduct,
        quantity: 1,
        key: Math.floor(Math.random() * 9999999999),
      };
      dispatch(addCart(newCart));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "The product has been added to cart",
        showConfirmButton: false,
        timer: 1500,
      });
      await API.patch(
        "/users/addcart",
        {
          cart: [
            ...carts,
            {
              ...detailProduct,
              quantity: 1,
              key: Math.floor(Math.random() * 9999999999),
            },
          ],
        },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This product has been added to your cart !",
      });
    }
  };

  const handleOnchange = (key) => {
    // history.push(`/detail/${detailProduct._id}/${key}`);
  };

  return (
    <div className="container-fluid">
      <div className="breadcumb-wrapper">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="">{categoryDetail}</Breadcrumb.Item>
          <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
            {detailProduct.title}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="main-product">
        <div className="left-product">
          <div className="left-product-gallery">
            <div className="image-product-overview-wrapper">
              <div className="image-wrapper">
                <img
                  className="image-primary"
                  src={image}
                  alt={detailProduct.title}
                  style={{ width: 550, height: 550, objectFit: "scale-down" }}
                />
              </div>
            </div>
            <ul className="thumbnail-list" style={{ listStyle: "none" }}>
              <li className="image-thumbnail">
                <button>
                  <img
                    style={{ objectFit: "scale-down" }}
                    onClick={(e) =>
                      onClickShowImage(e, detailProduct?.images?.url)
                    }
                    src={detailProduct?.images?.url}
                    alt={detailProduct.title}
                  />
                </button>
              </li>
              <li className="image-thumbnail">
                <button>
                  <img
                    style={{ objectFit: "cover" }}
                    onClick={(e) =>
                      onClickShowImage(e, detailProduct?.thumbnail1?.url)
                    }
                    src={detailProduct?.thumbnail1?.url}
                    alt={detailProduct?.thumbnail1?.public_id}
                  />
                </button>
              </li>
              <li className="image-thumbnail">
                <button>
                  <img
                    onClick={(e) =>
                      onClickShowImage(e, detailProduct?.thumbnail2?.url)
                    }
                    src={detailProduct?.thumbnail2?.url}
                    alt={detailProduct?.thumbnail2?.public_id}
                  />
                </button>
              </li>
              <li className="image-thumbnail">
                <button>
                  <img
                    onClick={(e) =>
                      onClickShowImage(e, detailProduct?.thumbnail3?.url)
                    }
                    src={detailProduct?.thumbnail3?.url}
                    alt={detailProduct?.thumbnail3?.public_id}
                  />
                </button>
              </li>
              <li className="image-thumbnail">
                <button>
                  <img
                    onClick={(e) =>
                      onClickShowImage(e, detailProduct?.thumbnail4?.url)
                    }
                    src={detailProduct?.thumbnail4?.url}
                    alt={detailProduct?.thumbnail4?.public_id}
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-product">
          <div className="product-overview">
            <div className="product-title">
              <div className="product-name">
                <h3 style={{ textTransform: "capitalize" }}>
                  {detailProduct.title} - {detailProduct.color}
                </h3>
              </div>
              <div className="product-title-data">
                <div className="product-model">
                  <span>
                    <strong>Model</strong>:
                  </span>
                  <span>MGCR3LL/A</span>
                </div>
                <div className="product-sku">
                  <span>
                    <strong>SKU</strong>:
                  </span>
                  <span>6009746</span>
                </div>
              </div>
            </div>
            <div className="product-generated">
              <Rating rate={detailProduct} />
              <p>({detailProduct.numberReviews})</p>
            </div>
          </div>
          <div className="product-variations">
            <div className="product-stocking">
              <div className="product-stocking-name">
                <p
                  style={{
                    color: "#1890ff",
                    marginBottom: 20,
                    userSelect: "none",
                  }}
                >
                  {detailProduct.status} !
                </p>
              </div>
            </div>
            <div className="product-model-family">
              <div className="product-model-family-name">
                <p>Model Family:</p>
              </div>
              <Select
                defaultValue="ip12pm"
                size="large"
                style={{ textTransform: "capitalize" }}

                // onChange={handleChange}
              >
                <Option value="ip12pm" style={{ textTransform: "capitalize" }}>
                  {detailProduct.title}
                </Option>
                <Option disabled value="ip12p">
                  Apple iPhone 12 Pro
                </Option>
                <Option disabled value="ip12">
                  Apple iPhone 12
                </Option>
                <Option disabled value="ip12mn">
                  Apple iPhone 12 Mini
                </Option>
              </Select>
            </div>
            <div className="product-memory">
              <div className="product-memory-name">
                <p>Internal Memory:</p>
              </div>
              <Select
                defaultValue="64"
                size="large"
                // onChange={handleChange}
              >
                <Option value="64">{detailProduct.memory} GB</Option>
                <Option disabled value="128gb">
                  128 GB
                </Option>
                <Option disabled value="256gb">
                  256 GB
                </Option>
                <Option disabled value="512gb">
                  512 GB
                </Option>
              </Select>
            </div>
            <div className="product-color">
              <div className="product-color-name">
                <p>Color:</p>
              </div>
              <Select
                defaultValue={1}
                size="large"
                style={{ textTransform: "capitalize" }}
                // onChange={handleChange}
              >
                <Option style={{ textTransform: "capitalize" }} value={1}>
                  {detailProduct.color}
                </Option>
                <Option disabled value={2}>
                  Gold
                </Option>
                <Option disabled value={3}>
                  Graphit
                </Option>
                <Option disabled value={4}>
                  Silver
                </Option>
              </Select>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {detailProduct.sale === 0 ? (
                <div className="product-price">
                  <p>PRICE:</p>
                  <span>{detailProduct.price}$</span>
                </div>
              ) : (
                <>
                  <div className="product-price">
                    <p>PRICE:</p>
                    <span style={{ textDecoration: "line-through" }}>
                      {detailProduct.price}$
                    </span>
                    <span style={{ fontSize: 16 }}>-{detailProduct.sale}%</span>
                  </div>
                  <div className="product-price">
                    <span>
                      {Math.floor(
                        detailProduct.price -
                          detailProduct.price * (detailProduct.sale / 100)
                      )}
                      $
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="product-add-cart">
              <div
                className="btn"
                style={{
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "rgb(228, 228, 228)",
                  cursor: "pointer",
                }}
                // href="#cart"
                onClick={addCartItem}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="related-products">
        <h2>People also viewed</h2>
        <div className="related-products-list">
          <Row gutter={24}>
            {products
              .filter((product) => product.category === detailProduct.category)
              .slice(0, 4)
              .map((product) => {
                return product.product_id !== detailProduct.product_id ? (
                  <Col key={product._id} className="gutter-row" span={6}>
                    <CardItem key={product._id} product={product} />
                  </Col>
                ) : null;
              })}
          </Row>
        </div>
      </div>
      <div className="information_product-more">
        <Tabs
          defaultActiveKey="system"
          centered
          size="large"
          onChange={(key) => handleOnchange(key)}
        >
          <TabPane tab="Mobile System" key="system">
            <MobileSystem detailProduct={detailProduct} />
          </TabPane>
          <TabPane tab="Quality evalution" key="evalution">
            <Evalution />
          </TabPane>
          <TabPane tab="Product Reviews" key="reviews">
            <Reviews detailProduct={detailProduct} socket={socket} />
          </TabPane>
          <TabPane tab="Questions And Answers" key="QandA">
            <QuestionAndAnswers detailProduct={detailProduct} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default DetailProduct;
