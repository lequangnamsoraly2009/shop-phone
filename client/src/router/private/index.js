import { Layout, Row } from "antd";
import { Content } from "antd/lib/layout/layout";

import React from "react";
import { Route, Switch } from "react-router-dom";
import HeaderAdmin from "../../admin/components/header";
import SideBar from "../../admin/components/sidebar";
import FooterAmdin from "../../admin/components/footer";
import Admin from "../../admin";
import DashBoard from "../../admin/pages/dashboard";

function PrivateRouter() {
  return (
    <Layout>
      <HeaderAdmin />
      <Content>
        <Row gutter={16} style={{ margin: "0 50px" }}>
          <SideBar />
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/home" component={DashBoard} />
          </Switch>
        </Row>
      </Content>
      <FooterAmdin />
    </Layout>
  );
}

export default PrivateRouter;
