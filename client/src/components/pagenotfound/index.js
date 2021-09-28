import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="container-fluid">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Way Back Home</Button>
          </Link>
        }
      />
    </div>
  );
}

export default PageNotFound;
