import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import React, { useEffect, useState } from "react";

function CardSales({ pricePaymentMonths, totalPriceYears }) {
  const [totalPriceCurrentMonth, setTotalPriceCurrentMonth] = useState(0);
  const [totalPricePreviousMonth, setTotalPricePreviousMonth] = useState(0);
  useEffect(() => {
    setTotalPriceCurrentMonth(pricePaymentMonths[new Date().getMonth()]);
    setTotalPricePreviousMonth(pricePaymentMonths[new Date().getMonth() - 1]);
  }, [pricePaymentMonths]);

  return (
    <div style={{ margin: "20px 30px" }}>
      <Row gutter={48} justify="center">
        <Col span={6}>
          <Card style={{ border: "1px solid #aaa" }}>
            <Statistic
              title="Previous Month"
              value={totalPricePreviousMonth}
              precision={2}
              suffix="$"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ border: "1px solid #aaa" }}>
            <Statistic
              title="Current Month"
              value={totalPriceCurrentMonth}
              precision={2}
              suffix="$"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ border: "1px solid #aaa" }}>
            <Statistic
              title="Compare Two Months"
              value={
                (totalPriceCurrentMonth / totalPricePreviousMonth) * 100 - 100
              }
              precision={2}
              valueStyle={
                (totalPriceCurrentMonth / totalPricePreviousMonth) * 100 - 100 >
                0
                  ? { color: "#3f8600" }
                  : (totalPriceCurrentMonth / totalPricePreviousMonth) * 100 -
                      100 ===
                    0
                  ? { color: "lightgray" }
                  : { color: "#cf1322" }
              }
              prefix={
                (totalPriceCurrentMonth / totalPricePreviousMonth) * 100 - 100 >
                0 ? (
                  <ArrowUpOutlined />
                ) : (totalPriceCurrentMonth / totalPricePreviousMonth) * 100 -
                    100 ===
                  0 ? (
                  <PauseOutlined />
                ) : (
                  <ArrowDownOutlined />
                )
              }
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CardSales;
