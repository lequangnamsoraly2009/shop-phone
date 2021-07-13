import React from "react";
import UserAPI from "../../../../api/userAPI";
import Carousel from "../../components/Carousel";
import CategoryIphone from "../../components/CategoryIphone";

function DashBoard() {
  UserAPI();
  return (
    <div className="container-fluid">
      <div style={{height: "auto"}}>
        <Carousel />
        <CategoryIphone />
      </div>
    </div>
  );
}

export default DashBoard;
