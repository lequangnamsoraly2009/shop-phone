import { Button, Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./mainVoucher.css";

function MainVoucher() {
  const { vouchers } = useSelector((state) => state.vouchers);

  const [voucherPublic, setVoucherPublic] = useState([]);

  useEffect(() => {
    const voucherPub = vouchers.filter(
      (voucher) => voucher.status === "Public"
    );
    setVoucherPublic(voucherPub);
  }, [vouchers]);

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
            {voucherPublic.map((voucher) => (
              <Col key={voucher._id} span={8}>
                <Card title={voucher.voucherName} bordered>
                  <div className="voucher-coupon-1-header">
                    <div className="voucher-coupon-1-header_giam">
                      <span>{voucher.valueCode}$ Off</span>
                    </div>
                    <div>
                      <span>Remaining Amount: {voucher.numberCodeRemain}</span>
                    </div>
                  </div>
                  <div className="voucher-coupon-1-button">
                    <Button type="primary">Save</Button>
                  </div>
                  <div className="voucher-coupon-1-expirate">
                    <span>Expiration date: {new Date(voucher.expiryDate).toLocaleString("en-GB")}</span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default MainVoucher;
