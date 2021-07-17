import React from "react";
import UserAPI from "../../../../api/userAPI";
import Carousel from "../../components/Carousel";
import NewArrivals from "../../components/NewArrivals";

function DashBoard() {
  UserAPI();
  return (
    <div className="container-fluid">
      <div style={{height: "auto"}}>
        <Carousel />
        <NewArrivals />
      </div>
    </div>
  );
}

export default DashBoard;
