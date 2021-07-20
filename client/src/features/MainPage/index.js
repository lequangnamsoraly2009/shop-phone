import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Cart from "../Cart";
import CheckOut from "./pages/CheckOut";
import DashBoard from "./pages/DashBoard";
import DetailProduct from "./pages/DetailProduct";

function MainPage() {
  const match = useRouteMatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <Switch>
      {/* <Redirect exact from="/" to="/home" /> */}
      <Route path={`${match.url}/`} exact component={DashBoard} />
      <Route path={`${match.url}/cart`} exact component={Cart} />
      {isLoggedIn ? (
        <>
          <Route path={`${match.url}/checkout`} exact component={CheckOut} />
        </>
      ) : (
        <>
          <p>Page Not Found</p>
        </>
      )}
      <Route path={`${match.url}/:id`} exact component={DetailProduct} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

export default MainPage;
