import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Cart from "../Cart";
import CheckOut from "./pages/CheckOut";
import DashBoard from "./pages/DashBoard";

function MainPage() {
  const match = useRouteMatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <Switch>
      {/* <Redirect exact from="/" to="/home" /> */}
      <Route path={`${match.url}/`} exact component={DashBoard} />
      <Route path={`${match.url}/cart`} component={Cart} />
      {isLoggedIn ? (
        <Switch>
          <Route path={`${match.url}/checkout`} component={CheckOut} />
        </Switch>
      ) : (
        <Switch>
          <p>Page Not Found</p>
        </Switch>
      )}

      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

export default MainPage;
