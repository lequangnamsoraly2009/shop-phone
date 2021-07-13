import React from "react";
import UserAPI from "../../../../api/userAPI";

function DashBoard() {
  UserAPI();
  return (
    <div className="container-fluid">
      <div style={{ height: 400, background: "crimson" }}>Hi DashBoard</div>
    </div>
  );
}

export default DashBoard;
