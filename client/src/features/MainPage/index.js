import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import PageNotFound from "../../components/pagenotfound";
import Cart from "../Cart";
import CheckOut from "./pages/CheckOut";
import DashBoard from "./pages/DashBoard";

function MainPage() {
  const match = useRouteMatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={DashBoard} />
      <Route path={`${match.url}/cart`} component={Cart} />
      {isLoggedIn ? (
        <Switch>
          <Route path={`${match.url}/checkout`} component={CheckOut} />
        </Switch>
      ) : (
        <Switch>
          <Route component={PageNotFound} />
        </Switch>
      )}
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default MainPage;
