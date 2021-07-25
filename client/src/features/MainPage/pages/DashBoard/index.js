import React from "react";
import Advertisement from "../../components/Advertisement";
import BrandShow from "../../components/BrandShow";
import Carousel from "../../components/Carousel";
import Iphone from "../../components/Iphone";
import NewArrivals from "../../components/NewArrivals";
import PhoneSold from "../../components/PhoneSold";

function DashBoard() {

  return (
    <div className="container-fluid">
      <div style={{height: "auto"}}>
        <Carousel />
        <NewArrivals />
        <Advertisement />
        <PhoneSold />
        <Iphone />
        <BrandShow />
      </div>
    </div>
  );
}

export default DashBoard;
