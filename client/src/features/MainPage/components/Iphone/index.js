import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardItem from "../CardItem";
import API from "../../../../api/axiosClient";
import {
  setCategoryFilter,
  setPageFilter,
  setSearchFilter,
  setSortFilter,
} from "../../../../app/filterSlice";

function Iphone() {
  const [iphones, setIphones] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getNewArrivals = async () => {
      const response = await API.get(
        `/api/filter/products?limit=${
          1 * 8
        }&category=60fda6f142896d2fbb6d9ae4&&title[regex]=`
      );
      setIphones(response.data.products);
    };
    getNewArrivals();
    return () => {
      setIphones([]); // This worked for me
    };
  }, []);

  const handleClick = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    // history.push("/category");
    dispatch(setSortFilter(""));
    dispatch(setCategoryFilter("category=60fda6f142896d2fbb6d9ae4"));
    dispatch(setSearchFilter(""));
    dispatch(setPageFilter(1));
  };

  return (
    <section className="soraly-section-5">
      <div className="banner-brands">
        <img
          src="https://cdn.cellphones.com.vn/media/wysiwyg/new-HP_DESKTOP_COVID.png"
          alt="banner"
        />
      </div>
      <div className="title-global">
        <h2>IPHONE</h2>
      </div>
      <div className="site-phone-sold">
        <Row gutter={[16, 24]}>
          {iphones.map((product) => {
            return (
              <Col key={product._id} className="gutter-row" span={6}>
                <CardItem product={product} />
              </Col>
            );
          })}
        </Row>
      </div>
      <div style={{ display: "flex" }}>
        <a
          className="btn"
          style={{ margin: "20px auto", cursor: "pointer" }}
          onClick={handleClick}
          href="/category"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          See More
        </a>
      </div>
    </section>
  );
}

export default Iphone;
