import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Table, Input } from "antd";
import React from "react";

const {Search} = Input;

function VoucherPage() {
  const handleOnclickReload = () => {
    // dispatch(setSearchPayments(""));
    window.location.reload();
  };
  return (
    <div className="container-admin">
      <div className="header_page">
        <h3>Total Voucher Here</h3>
      </div>
      <div className="product_breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item>Vouchers</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="product_data">
        <div className="product_data-header">
          <h3>Data Table Vouchers</h3>
        </div>
        <div className="product_data-wrapper">
          <div className="product_data-search">
            <Search
              placeholder="Search Order"
              allowClear
              enterButton="Search Order"
              size="middle"
                
              //   onSearch={onSearch}
            />
          </div>
          <div className="product_data-create">
            <Button onClick={handleOnclickReload} type="primary">
              Reload Page
            </Button>
          </div>
        </div>
        <div className="product_data-table">
          {/* <Skeleton
            active
            loading={isLoading}
            paragraph={{ rows: 10 }}
            title={{ width: "100%" }}
          > */}
          <Table
            style={{ border: "1px solid #000" }}
            rowKey="_id"
            pagination={{ position: ["none", "none"] }}
            //   columns={columns}
            //   dataSource={payments}
          />
          {/* </Skeleton> */}
        </div>
        {/* <div className="product_data-pagination">
          {paginationPayments.length <= 10 ? (
            ""
          ) : (
            <Pagination
              defaultCurrent={1}
              total={paginationPayments.length}
              showSizeChanger={false}
              pageSize={10}
              onChange={(page, pageSize) => handleChangePage(page, pageSize)}
            />
          )}
        </div> */}
      </div>
    </div>
  );
}

export default VoucherPage;
