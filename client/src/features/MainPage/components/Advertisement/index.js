import React from "react";
import Slider from "react-slick";
import "./adv.css"

function Advertisement() {
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
    <section className="soraly-section-adv">
      <Slider {...settings}>
        <div>
          <img
            style={{ width: 400, height: 75 }}
            src="https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0521/COVID-MEGA/KV/Anti-Covid_768x140.png"
            alt="anti-covid"
          />
        </div>
        <div>
          <img
            style={{ width: 400, height: 75 }}
            src="https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0721/AV/1518/AV2_0607-home-768x140-v1.png"
            alt="hi"
          />
        </div>
        <div>
          <img
            style={{ width: 400, height: 75 }}
            src="https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0721/HPW%232/KV/MDA_1407-home-768x140.png"
            alt="laptop"
          />
        </div>
        <div>
          <img
            style={{ width: 400, height: 75 }}
            src="https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0521/COVID-MEGA/KV/Anti-Covid_768x140.png"
            alt="anti-covid"
          />
        </div>
        <div>
          <img
            style={{ width: 400, height: 75 }}
            src="https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0721/AV/1518/AV2_0607-home-768x140-v1.png"
            alt="hi"
          />
        </div>
        <div>
          <img
            style={{ width: 400, height: 75 }}
            src="https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0721/HPW%232/KV/MDA_1407-home-768x140.png"
            alt="laptop"
          />
        </div>
        <div>
          <img
            style={{ width: 400, height: 75 }}
            src="https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0521/COVID-MEGA/KV/Anti-Covid_768x140.png"
            alt="anti-covid"
          />
        </div>
        <div>
          <img
            style={{ width: 400, height: 75 }}
            src="https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0721/AV/1518/AV2_0607-home-768x140-v1.png"
            alt="hi"
          />
        </div>
        <div>
          <img
            style={{ width: 400, height: 75 }}
            src="https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0721/HPW%232/KV/MDA_1407-home-768x140.png"
            alt="laptop"
          />
        </div>
      </Slider>
    </section>
  );
}

export default Advertisement;
