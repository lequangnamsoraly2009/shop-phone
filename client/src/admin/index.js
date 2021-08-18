import { Col } from "antd";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CategoryPage from "./pages/categoryPage";
import OrderPage from "./pages/orderPage";
import UserPage from "./pages/userPage";
import InformationPage from "./pages/informationPage";
import NotificationPage from "./pages/notificationPage";
import SettingPage from "./pages/settingPage";
import ContactPage from "./pages/contactPage";
import AboutPape from "./pages/aboutPage";
import HelpPage from "./pages/helpPage";
import ProductPage from "./pages/productPage";
import QuestionProductPage from "./pages/QuestionProductPage";

function Admin() {
  const match = useRouteMatch();
  return (
    <Col className="gutter-row" span={21}>
      <Switch>
        <Route path={`${match.url}/products`} component={ProductPage} />
        <Route path={`${match.url}/categories`} component={CategoryPage} />
        <Route path={`${match.url}/orders`} component={OrderPage} />
        <Route path={`${match.url}/users`} component={UserPage} />
        <Route path={`${match.url}/information`} exact component={InformationPage} />
        <Route path={`${match.url}/notification`} exact component={NotificationPage} />
        <Route path={`${match.url}/setting`} exact component={SettingPage} />
        <Route path={`${match.url}/pending-question`} component={QuestionProductPage} />
        <Route path={`${match.url}/contact`} exact component={ContactPage} />
        <Route path={`${match.url}/about`} exact component={AboutPape} />
        <Route path={`${match.url}/help`} exact component={HelpPage} />
      </Switch>
    </Col>
  );
}

export default Admin;
