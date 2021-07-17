import React from "react";
import { Row, Col, Card } from "antd";
import "./NewArrivals.css";
import Meta from "antd/lib/card/Meta";

function NewArrivals() {
  return (
    <section className="soraly-section-2">
      <div className="title-global">
        <h2>NEW ARRIVALS</h2>
      </div>
      <div className="site_card-wrapper">
        <Row gutter={[16, 16]}>
          <Col span={6} style={{ height: "auto" }}>
            <Card
              hoverable
              cover={
                <img
                  style={{ paddingTop: 20 }}
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title="Iphone 11 64GB" style={{ margin: "0px 5px" }} />
              <div className="price-down">
                <p
                  style={{
                    margin: 5,
                    textDecoration: "line-through",
                    fontWeight: 300,
                  }}
                >
                  700$
                </p>

                <span style={{ margin: "auto 0", fontWeight: 300 }}>-10%</span>
              </div>
              <p style={{ margin: "0px 5px", fontWeight: 800 }}>630$</p>
            </Card>
          </Col>
          <Col span={6} style={{ height: "auto" }}>
            <Card
              hoverable
              cover={
                <img
                  style={{ paddingTop: 20 }}
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title="Iphone 11 64GB" style={{ margin: "0px 5px" }} />
              <div className="price-down">
                <p
                  style={{
                    margin: 5,
                    textDecoration: "line-through",
                    fontWeight: 300,
                  }}
                >
                  700$
                </p>

                <span style={{ margin: "auto 0", fontWeight: 300 }}>-10%</span>
              </div>
              <p style={{ margin: "0px 5px", fontWeight: 800 }}>630$</p>
            </Card>
          </Col>
          <Col span={6} style={{ height: "auto" }}>
            <Card
              hoverable
              cover={
                <img
                  style={{ paddingTop: 20 }}
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title="Iphone 11 64GB" style={{ margin: "0px 5px" }} />
              <div className="price-down">
                <p
                  style={{
                    margin: 5,
                    textDecoration: "line-through",
                    fontWeight: 300,
                  }}
                >
                  700$
                </p>

                <span style={{ margin: "auto 0", fontWeight: 300 }}>-10%</span>
              </div>
              <p style={{ margin: "0px 5px", fontWeight: 800 }}>630$</p>
            </Card>
          </Col>
          <Col span={6} style={{ height: "auto" }}>
            <Card
              hoverable
              cover={
                <img
                  style={{ paddingTop: 20 }}
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title="Iphone 11 64GB" style={{ margin: "0px 5px" }} />
              <div className="price-down">
                <p
                  style={{
                    margin: 5,
                    textDecoration: "line-through",
                    fontWeight: 300,
                  }}
                >
                  700$
                </p>

                <span style={{ margin: "auto 0", fontWeight: 300 }}>-10%</span>
              </div>
              <p style={{ margin: "0px 5px", fontWeight: 800 }}>630$</p>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default NewArrivals;
