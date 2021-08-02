import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import CardItem from "../CardItem";
import "./phonesold.css";
import { useDispatch } from "react-redux";
import {
  setCategoryFilter,
  setPageFilter,
  setSearchFilter,
  setSortFilter,
} from "../../../../app/filterSlice";
import API from "../../../../api/axiosClient";
import { Link } from "react-router-dom";

function PhoneSold() {
  const [bestSellers, setBetSellers] = useState([]);

  const dispatch = useDispatch();

  const handleOnClick = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    dispatch(setSortFilter("sort=-numberSold"));
    dispatch(setCategoryFilter(""));
    dispatch(setSearchFilter(""));
    dispatch(setPageFilter(1));
  };

  useEffect(() => {
    const getBestSeller = async () => {
      const response = await API.get(
        `/api/filter/products?limit=${1 * 8}&&sort=-numberSold&title[regex]=`
      );
      setBetSellers(response.data.products);
    };
    getBestSeller();
  }, []);

  return (
    <section className="soraly-section-3">
      <div className="title-global">
        <h2>BEST SELLING 2021</h2>
      </div>
      <div className="site-phone-sold">
        <Row gutter={[8, 12]}>
          {bestSellers.map((product) => {
            return (
              <Col key={product._id} className="gutter-row" span={6}>
                <CardItem product={product} />
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
          onClick={handleOnClick}
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

export default PhoneSold;
