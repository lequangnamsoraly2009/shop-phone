import { Button, Card, Col, Row } from "antd";
import React from "react";
import "./voucherUser.css";
import { useSelector } from "react-redux";
import {useHistory} from "react-router-dom"

function VoucherUser() {
  const { user } = useSelector((state) => state.user);

  const history = useHistory();

  const handleUseVoucher = () =>{
    history.push("/home/cart")
  }

  return (
    <div className="container-fluid">
      <div className="voucher-user-header">
        <span>List Vouchers Saved</span>
      </div>
      <div className="voucher-coupon-1">
        <Row gutter={[16, 16]}>
          {user.vouchersSave.map((voucher) => (
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
                  <Button
                    type="primary"
                      onClick={() => handleUseVoucher()}
                  >
                    Use
                  </Button>
                </div>
                <div className="voucher-coupon-1-expirate">
                  <span>
                    Expiration date:{" "}
                    {new Date(voucher.expiryDate).toLocaleString("en-GB")}
                  </span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default VoucherUser;
