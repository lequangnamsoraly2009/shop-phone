import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import "./detailVoucher.css";

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
      <div className="voucher_detail-main">
        <div className="voucher_detail-left">
          <div className="voucher_detail-left-header">
            <span>List Users</span>
          </div>
          <div className="voucher_detail-left-table">
            hi
          </div>
        </div>
        <div className="voucher_detail-right">
          <div className="voucher_detail-right-header">
            <span>Actions</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailVoucher;
