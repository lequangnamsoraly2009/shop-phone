import { Col, Radio, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import "./listitem.css";
import CardItemCate from "../cardItemCate";

function ListItem() {
  const { products } = useSelector((state) => state.products);
  return (
    <div>
      <div className="list-item-header">
        <span style={{ margin: "0 50px", fontSize: 15, fontWeight: 700 }}>
          Sort By:{" "}
        </span>
        {/* value -> radio.group  onChange={this.handleSizeChange}*/}
        <Radio.Group>
          <Radio.Button value="">Newest</Radio.Button>
          <Radio.Button value="sort=oldest">Oldest</Radio.Button>
          <Radio.Button value="sort=-soldNumber">Best sales</Radio.Button>
          <Radio.Button value="sort=-price">Price: Hight - Low</Radio.Button>
          <Radio.Button value="sort=price">Price: Low - Hight</Radio.Button>
        </Radio.Group>
      </div>
      <div className="list-item-content">
        <div className="list-item-main">
          <Row gutter={[12, 12]}>
            {products.map((product) => {
              return (
                <Col key={product._id} className="gutter-row" span={6}>
                  <CardItemCate product={product} />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
