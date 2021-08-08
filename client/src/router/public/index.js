import React from "react";
import { Layout } from "antd";
import HeaderNav from "../../components/header";
import { Content } from "antd/lib/layout/layout";
import { Redirect, Route, Switch } from "react-router-dom";
import FooterNav from "../../components/footer";
import PageNotFound from "../../components/pagenotfound";
import { useSelector } from "react-redux";
import MainPage from "../../features/MainPage";
import DetailProductMain from "../../features/MainPage/pages";
import CategoryPage from "../../features/Category";
import AuthPage from "../../features/Auth";
import Customer from "../../features/Customer";


function PublicRouter() {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <Layout>
      <HeaderNav />
      <Content>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={MainPage} />
          <Route path="/detail" component={DetailProductMain} />
          <Route path="/category" component={CategoryPage} />
          <Route
            path="/buyer"
            component={!isLoggedIn ? AuthPage : PageNotFound}
          />
          <Route
            path="/customer"
            component={isLoggedIn ? Customer : PageNotFound}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Content>
      <FooterNav />
    </Layout>
  );
}

export default PublicRouter;
