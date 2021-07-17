import React from "react";
import Slider from "react-slick";

function BrandShow() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
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
    <section className="soraly-section-2">
      <div className="title-global">
        <h2>BRAND HIGHLIGHTS</h2>
      </div>
      <div>
        <Slider {...settings}>
          <div>
            <img
              src="//cdn.tgdd.vn/2021/07/banner/samsung-390-210-390x210.png"
              alt="a"
            />
          </div>
          <div>
            <img
              src="//cdn.tgdd.vn/2021/06/banner/DT-390x210-2.png"
              alt="iphone"
            />
          </div>
          <div>
            <img
              src="//cdn.tgdd.vn/2021/07/banner/Laptop-390x210-1.png"
              alt="laptop"
            />
          </div>
          <div>
            <img
              src="//cdn.tgdd.vn/2021/07/banner/samsung-390-210-390x210.png"
              alt="a"
            />
          </div>
          <div>
            <img
              src="//cdn.tgdd.vn/2021/06/banner/DT-390x210-2.png"
              alt="iphone"
            />
          </div>
          <div>
            <img
              src="//cdn.tgdd.vn/2021/07/banner/Laptop-390x210-1.png"
              alt="laptop"
            />
          </div>
          <div>
            <img
              src="//cdn.tgdd.vn/2021/06/banner/DT-390x210-2.png"
              alt="iphone"
            />
          </div>
          <div>
            <img
              src="//cdn.tgdd.vn/2021/07/banner/samsung-390-210-390x210.png"
              alt="a"
            />
          </div>
          <div>
            <img
              src="//cdn.tgdd.vn/2021/06/banner/DT-390x210-2.png"
              alt="iphone"
            />
          </div>
        </Slider>
      </div>
    </section>
  );
}

export default BrandShow;
