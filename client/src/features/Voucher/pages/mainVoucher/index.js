import { Button, Card, Col, Row } from "antd";
import React from "react";
import "./mainVoucher.css"

function MainVoucher() {
  return (
    <div className="container-fluid">
      <div className="voucher-header-1">
        <img
          src="https://cf.shopee.vn/file/5d30a109a5131421281b6aa9c22ebde7"
          alt="qua-tang-ban-moi"
        />
        <div className="voucher-header-1-2">
          <img
            src="https://cf.shopee.vn/file/768d95dec6c495d0d246c13a43a5a5fc"
            alt="danh-rieng-cho-ban"
          />
        </div>
        <div className="voucher-coupon-1">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Voucher Name" bordered>
                <div className="voucher-coupon-1-header">
                  <div>
                    <span>Giam 20k</span>
                  </div>
                  <div>
                    <span>So luong con lai: 45</span>
                  </div>
                </div>
                <div>
                  <Button type="primary">Save</Button>
                </div>
                <div>
                  <span>Expiration date: 20/09/2021</span>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered>
                Card content
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card title" bordered>
                Card content
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default MainVoucher;
