import React, { useState } from "react";
import { Breadcrumb, Rate, Select } from "antd";
import "./detailProduct.css";
const { Option } = Select;

function DetailProduct() {
  const [image, setImage] = useState(
    "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6009/6009746_sd.jpg;maxHeight=640;maxWidth=550"
  );

  const onClickShowImage = (e, src) => {
    e.preventDefault();
    setImage(src);
  };

  return (
    <div className="container-fluid">
      <div className="breadcumb-wrapper">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="">Iphone</Breadcrumb.Item>
          <Breadcrumb.Item>Iphone 12</Breadcrumb.Item>
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
                <h3>Apple - iPhone 12 Pro Max 5G 512GB - Gold (AT&T)</h3>
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
              />{" "}
              <a href="#rate">100 rated </a>
            </div>
          </div>
          <div className="product-variations">
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
              <span>1200 $</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
