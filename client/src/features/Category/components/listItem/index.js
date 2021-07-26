import { Col, Pagination, Radio, Result, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./listitem.css";
import CardItemCate from "../cardItemCate";
import { setPageFilter, setSortFilter } from "../../../../app/filterSlice";

function ListItem() {
  const { productsFilter } = useSelector((state) => state.productsFilter);
  const dispatch = useDispatch();

  const handleClickSort = (e) => {
    dispatch(setSortFilter(e.target.value));
  };

  const handleChangePage = (page, pageSize) => {
    dispatch(setPageFilter(page));
  };

  return (
    <div>
      <div className="list-item-header">
        <span style={{ margin: "0 50px", fontSize: 15, fontWeight: 700 }}>
          Sort By:{" "}
        </span>
        {/* value -> radio.group  onChange={this.handleSizeChange}*/}
        <Radio.Group>
          <Radio.Button onClick={handleClickSort} value="">
            Newest
          </Radio.Button>
          <Radio.Button onClick={handleClickSort} value="sort=oldest">
            Oldest
          </Radio.Button>
          <Radio.Button onClick={handleClickSort} value="sort=-numberSold">
            Best sales
          </Radio.Button>
          <Radio.Button onClick={handleClickSort} value="sort=-price">
            Price: Hight - Low
          </Radio.Button>
          <Radio.Button onClick={handleClickSort} value="sort=price">
            Price: Low - Hight
          </Radio.Button>
        </Radio.Group>
      </div>
      <div className="list-item-content">
        <div className="list-item-main">
          {productsFilter.length === 0 ? (
            <>
              <Result status="warning" title="No search results found" />
            </>
          ) : (
            <>
              <Row gutter={[12, 12]}>
                {productsFilter.map((product) => {
                  return (
                    <Col key={product._id} className="gutter-row" span={6}>
                      <CardItemCate product={product} />
                    </Col>
                  );
                })}
              </Row>
            </>
          )}
        </div>
      </div>
      <div className="list-item-pagination">
        {productsFilter.length >= 0 && productsFilter.length <= 20 ? (
          ""
        ) : (
          <Pagination
            defaultCurrent={1}
            total={200}
            showSizeChanger={false}
            pageSize={20}
            onChange={(page, pageSize) => handleChangePage(page, pageSize)}
          />
        )}
      </div>
    </div>
  );
}

export default ListItem;
