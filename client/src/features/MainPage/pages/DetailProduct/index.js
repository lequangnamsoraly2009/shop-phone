import React, { useState } from "react";
import { Breadcrumb, Rate } from "antd";
import "./detailProduct.css";

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
          <Breadcrumb.Item>Iphone 11</Breadcrumb.Item>
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
        <div className="right-product"></div>
      </div>
    </div>
  );
}

export default DetailProduct;
