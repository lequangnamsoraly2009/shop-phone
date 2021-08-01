import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DetailOrder from "./detailOrder";
import MainOrder from "./mainOrder";

function OrderPage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={MainOrder} />
      <Route path={`${match.url}/:id`} component={DetailOrder} />
    </Switch>
  );
}

export default OrderPage;
