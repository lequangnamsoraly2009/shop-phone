import { Alert} from "antd";
import React from "react";

function ActivateUser() {
  return (
    <div className="container-fluid">
      <div className="active-header" style={{ display: "flex" }}>
        <span
          style={{ margin: "10px auto", fontSize: "24px", fontWeight: 700 }}
        >
          Activate User
        </span>
      </div>
      <div style={{marginBottom: 366}}>
        <Alert
          message="You have been successfully activated. You can login now!"
          type="success"
          showIcon
          action={
            <a href="/buyer/login">
              Login
            </a>
          }
        />
      </div>
    </div>
  );
}

export default ActivateUser;
