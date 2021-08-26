import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

function DetailVoucher() {

  const history = useHistory();


  const backPreviousPage = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div className="container-admin">
      <div className="header_page">
        <h3>
          <Button
            style={{ marginRight: 10 }}
            type="dashed"
            icon={<ArrowLeftOutlined />}
            onClick={backPreviousPage}
          />
          Detail Voucher
        </h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/products">Voucher</Breadcrumb.Item>
          <Breadcrumb.Item>
            {/* {!onEdit ? "Create" : "Update"} Product */}
            Detail Voucher
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
}

export default DetailVoucher;
