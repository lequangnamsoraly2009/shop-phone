import React from "react";
import Slider from "react-slick";
import "./carousel.css";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    rtl: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            pauseOnHover: true,
            rtl: true,
            arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <div className="carousel mobileHidden">
        <Slider {...settings}>
          <div>
            <img
              src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/6/30/637606925995211801_F-C1_1200x300.png"
              alt="hi"
            />
          </div>
          <div>
            <img
              src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/6/30/637606730975261719_F-C1_1200x300.png"
              alt="hi"
            />
          </div>
          <div>
            <img
              src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/7/1/637607303354411064_F-C1_1200x300.png"
              alt="hi"
            />
          </div>
          <div>
            <img
              src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/7/12/637617190007336359_F-C1_1200x300.png"
              alt="hi"
            />
          </div>
          <div>
            <img
              src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/7/12/637616771112398475_F-C1_1200x300.png"
              alt="hi"
            />
          </div>
          <div>
            <img
              src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/7/1/637607303354411064_F-C1_1200x300.png"
              alt="hi"
            />
          </div>
        </Slider>
      </div>
      <div className="banner-mobile mobileVisible">
        <Slider {...settings}>
          <div>
            <img
              className="banner-img"
              src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/6/30/637606925995211801_F-C1_1200x300.png"
              alt="hi"
            />
          </div>
          <div>
            <img
              className="banner-img"
              src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/6/30/637606730975261719_F-C1_1200x300.png"
              alt="hi"
            />
          </div>
          <div>
            <img
              className="banner-img"
              src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/7/1/637607303354411064_F-C1_1200x300.png"
              alt="hi"
            />
          </div>
          <div>
            <img
              className="banner-img"
              src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/7/12/637617190007336359_F-C1_1200x300.png"
              alt="hi"
            />
          </div>
          <div>
            <img
              className="banner-img"
              src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/7/12/637616771112398475_F-C1_1200x300.png"
              alt="hi"
            />
          </div>
          <div>
            <img
              className="banner-img"
              src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/7/1/637607303354411064_F-C1_1200x300.png"
              alt="hi"
            />
          </div>
        </Slider>
      </div>
    </>
  );
}

export default Carousel;
