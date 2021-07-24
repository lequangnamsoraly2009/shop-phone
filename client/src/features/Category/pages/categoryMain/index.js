import { Col, Row,Menu } from "antd";
import React from "react";
import {
    AppstoreOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

function Category() {
  return (
    <div className="container-fluid">
      <Row gutter={{ xs: 4, sm: 8, md: 8, lg: 12 }}>
        <Col className="gutter-row" span={4}>
          <div className="category">
            <div className="category-wrapper">
            <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="white"
        >
          <Menu.Item key="1" icon={<AppstoreOutlined spin />}>
               <Link to="/category">All Category</Link> 
          </Menu.Item>
          <SubMenu key="smart-phone" icon={<PhoneOutlined spin />} title="Smart Phone">
            <Menu.Item key="2"><Link to="/category/iphone">iPhone</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/category/samsung">SamSung</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/category/oppo">Oppo</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/category/vsmart">VsMart</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/category/nokia">Nokia</Link></Menu.Item>
            <Menu.Item key="8"><Link to="/category/vivo">Vivo</Link></Menu.Item>
            <Menu.Item key="9"><Link to="/category/xiaomi">Xiaomi</Link></Menu.Item>
            <Menu.Item key="10"><Link to="/category/oneplus">OnePlus</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="brick-phone" icon={<PhoneOutlined spin />} title="Brick Phone">
            <Menu.Item key="11"><Link to="/category/nokia">Nokia</Link></Menu.Item>
            <Menu.Item key="12"><Link to="/category/mobell">Mobell</Link></Menu.Item>
            <Menu.Item key="13"><Link to="/category/itel">iTel</Link></Menu.Item>
            <Menu.Item key="14"><Link to="/category/masstel">Masstel</Link></Menu.Item>
            <Menu.Item key="15"><Link to="/category/vertu">Vertu</Link></Menu.Item>
          </SubMenu>
        </Menu>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={18}>
          <div style={{border: "1px solid #000"}}>Danh sach san pham nam o day ha</div>
        </Col>
      </Row>
    </div>
  );
}

export default Category;
