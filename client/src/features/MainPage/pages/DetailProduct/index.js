import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, Rate, Row, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./detailProduct.css";
import CardItem from "../../components/CardItem";
// import UserAPI from "../../../../api/userAPI";
import Swal from "sweetalert2";
import { addCart } from "../../../../app/cartSlice";
import API from "../../../../api/axiosClient";

const { Option } = Select;

function DetailProduct() {
  const [image, setImage] = useState(
    "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6009/6009746_sd.jpg;maxHeight=640;maxWidth=550"
  );
  const [detailProduct, setDetailProduct] = useState([]);
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.token);
  const { carts } = useSelector((state) => state.carts);
  // console.log(products)
  const params = useParams();
  // console.log(params)
  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailProduct(product);
        }
      });
    }
  }, [params, products]);

  // console.log(detailProduct);
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
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'The product has been added to cart',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This product has been added to your cart !",
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="breadcumb-wrapper">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="">{detailProduct.category}</Breadcrumb.Item>
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
                <img className="image-primary" src={image} alt="iPhone 11" />
              </div>
            </div>
            <ul className="thumbnail-list" style={{ listStyle: "none" }}>
              <li className="image-thumbnail">
                <button>
                  <img
                    onClick={(e) =>
                      onClickShowImage(
                        e,
                        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6009/6009746_sd.jpg;maxHeight=640;maxWidth=550"
                      )
                    }
                    src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6009/6009746_sd.jpg;maxHeight=640;maxWidth=550"
                    alt="iPhone 11"
                  />
                </button>
              </li>
              <li className="image-thumbnail">
                <button>
                  <img
                    onClick={(e) =>
                      onClickShowImage(
                        e,
                        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6009/6009746cv13d.jpg;maxHeight=640;maxWidth=550"
                      )
                    }
                    src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6009/6009746cv13d.jpg;maxHeight=640;maxWidth=550"
                    alt="iPhone 11"
                  />
                </button>
              </li>
              <li className="image-thumbnail">
                <button>
                  <img
                    onClick={(e) =>
                      onClickShowImage(
                        e,
                        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6009/6009746cv11d.jpg;maxHeight=640;maxWidth=550"
                      )
                    }
                    src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6009/6009746cv11d.jpg;maxHeight=640;maxWidth=550"
                    alt="iPhone 11"
                  />
                </button>
              </li>
              <li className="image-thumbnail">
                <button>
                  <img
                    onClick={(e) =>
                      onClickShowImage(
                        e,
                        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6009/6009746cv12d.jpg;maxHeight=640;maxWidth=550"
                      )
                    }
                    src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6009/6009746cv12d.jpg;maxHeight=640;maxWidth=550"
                    alt="iPhone 11"
                  />
                </button>
              </li>
              <li className="image-thumbnail">
                <button>
                  <img
                    onClick={(e) =>
                      onClickShowImage(
                        e,
                        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6009/6009746cv14d.jpg;maxHeight=640;maxWidth=550"
                      )
                    }
                    src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6009/6009746cv14d.jpg;maxHeight=640;maxWidth=550"
                    alt="iPhone 11"
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
              <Rate
                allowHalf
                defaultValue={5}
                value={4.5}
                style={{ color: "red" }}
              />
              <a href="#rate">100 rated </a>
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
                // onChange={handleChange}
              >
                <Option value="ip12pm">Apple iPhone 12 Pro Max</Option>
                <Option value="ip12p">Apple iPhone 12 Pro</Option>
                <Option value="ip12">Apple iPhone 12</Option>
                <Option value="ip12mn">Apple iPhone 12 Mini</Option>
              </Select>
            </div>
            <div className="product-memory">
              <div className="product-memory-name">
                <p>Internal Memory:</p>
              </div>
              <Select
                defaultValue="512gb"
                size="large"
                // onChange={handleChange}
              >
                <Option value="64gb">64GB</Option>
                <Option value="128gb">128 GB</Option>
                <Option value="256gb">256 GB</Option>
                <Option value="512gb">512 GB</Option>
              </Select>
            </div>
            <div className="product-color">
              <div className="product-color-name">
                <p>Color:</p>
              </div>
              <Select
                defaultValue="gold"
                size="large"
                // onChange={handleChange}
              >
                <Option value="pacificblue">Pacific Blue</Option>
                <Option value="gold">Gold</Option>
                <Option value="graphit">Graphit</Option>
                <Option value="silver">Silver</Option>
              </Select>
            </div>
            <div className="product-price">
              <p>PRICE:</p>
              <span>{detailProduct.price}$</span>
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
    </div>
  );
}

export default DetailProduct;
