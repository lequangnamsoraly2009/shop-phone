import React from "react";
import UserAPI from "../../../../api/userAPI";
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
        <PhoneSold />
      </div>
    </div>
  );
}

export default DashBoard;
