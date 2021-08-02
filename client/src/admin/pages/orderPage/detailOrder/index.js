import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { columnTable } from "./tableColumn";

function DetailOrder() {
  const [detailOrder, setDetailOrder] = useState({});

  const { payments } = useSelector((state) => state.payments);

  const history = useHistory();
  const params = useParams();

  //   console.log(detailOrder);

  useEffect(() => {
    if (params) {
      payments.forEach((payment) => {
        if (payment._id === params.id) {
          setDetailOrder(payment);
        }
      });
    }
  }, [params, payments]);

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
          Orders From Customers
        </h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/orders">Orders</Breadcrumb.Item>
          <Breadcrumb.Item>Detail Orders</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="product_data">
        <Table
          columns={columnTable}
          dataSource={detailOrder.cart}
          pagination={{ position: ["none", "none"] }}
        />
      </div>
    </div>
  );
}

export default DetailOrder;
