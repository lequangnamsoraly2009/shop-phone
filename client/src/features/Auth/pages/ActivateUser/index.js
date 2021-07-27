import { Alert } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import API from "../../../../api/axiosClient";

function ActivateUser() {
  const params = useParams();
  console.log(params)
  const confirmActiveUser = async () => {
    try {
      await API.post("/users/activate",{...params});
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className="container-fluid">
      <div className="active-header" style={{ display: "flex" }}>
        <span
          style={{ margin: "10px auto", fontSize: "24px", fontWeight: 700 }}
        >
          Activate User
        </span>
      </div>
      <div style={{ marginBottom: 366 }}>
        <Alert
          message="You have been successfully activated. You can login now!"
          type="success"
          showIcon
          action={
            <a href="/buyer/login" onClick={() => confirmActiveUser()}>
              Login
            </a>
          }
        />
      </div>
    </div>
  );
}

export default ActivateUser;
