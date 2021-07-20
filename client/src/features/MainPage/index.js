import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Cart from "../Cart";
import CheckOut from "./pages/CheckOut";
import DashBoard from "./pages/DashBoard";
import DetailProduct from "./pages/DetailProduct";

function MainPage() {
  const match = useRouteMatch();
  return (
    <Switch>
      {/* <Redirect exact from="/" to="/home" /> */}
      <Route path={`${match.url}/`} exact component={DashBoard} />
      <Route path={`${match.url}/cart`} exact component={Cart} />
      <Route path={`${match.url}/checkout`} exact component={CheckOut} />
      <Route path={`${match.url}/:id`} exact component={DetailProduct} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

export default MainPage;
