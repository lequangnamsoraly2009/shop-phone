import React from "react";
import UserAPI from "../../../../api/userAPI";
import Advertisement from "../../components/Advertisement";
import BrandShow from "../../components/BrandShow";
import Carousel from "../../components/Carousel";
import NewArrivals from "../../components/NewArrivals";
import PhoneSold from "../../components/PhoneSold";

function DashBoard() {
  UserAPI();
  return (
    <div className="container-fluid">
      <div style={{height: "auto"}}>
        <Carousel />
        <NewArrivals />
        <Advertisement />
        <PhoneSold />
        <BrandShow />
      </div>
    </div>
  );
}

export default DashBoard;
