import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import "./NewArrivals.css";
import CardItem from "../CardItem";
import API from "../../../../api/axiosClient";
import { useDispatch } from "react-redux";
import {
  setCategoryFilter,
  setPageFilter,
  setSearchFilter,
  setSortFilter,
} from "../../../../app/productSlice";
import { Link } from "react-router-dom";

function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getNewArrivals = async () => {
      const response = await API.get(
        `/api/filter/products?limit=${1 * 8}&&sort=-createdAt&title[regex]=`
      );
      setNewArrivals(response.data.products);
    };
    getNewArrivals();
  }, []);

  const handleClick = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    dispatch(setSortFilter("sort=-createdAt"));
    dispatch(setCategoryFilter(""));
    dispatch(setSearchFilter(""));
    dispatch(setPageFilter(1));
  };

  return (
    <section className="soraly-section-2">
      <div className="banner-adv">
        <img
          src="https://cdn.tgdd.vn/2021/07/campaign/Artboard1copy28-1200x120.png"
          alt="banner"
        />
      </div>
      <div className="title-global">
        <h2>NEW ARRIVALS</h2>
      </div>
      <div className="site_card-wrapper">
        <Row gutter={[16, 16]}>
          {newArrivals.map((item) => {
            return (
              <Col key={item._id} span={6} style={{ height: "auto" }}>
                <a href={`/detail/${item._id}`}>
                  <CardItem product={item} />
                </a>
              </Col>
            );
          })}
        </Row>
      </div>
      <div style={{ display: "flex" }}>
        <Link
          to="/category"
          className="btn"
          style={{ margin: "20px auto", cursor: "pointer" }}
          onClick={handleClick}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          See More
        </Link>
      </div>
    </section>
  );
}

export default NewArrivals;
