import React from "react";
import UserAPI from "../../../../api/userAPI";
import Carousel from "../../components/Carousel";

function DashBoard() {
  UserAPI();
  return (
    <div className="container-fluid">
      <div style={{height: "auto"}}>
        <Carousel />
      </div>
    </div>
  );
}

export default DashBoard;
