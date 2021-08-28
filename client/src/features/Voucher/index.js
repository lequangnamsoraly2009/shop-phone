import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PageNotFound from "../../components/pagenotfound";
import MainVoucher from "./pages/mainVoucher";

function VoucherPageCustomer() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={MainVoucher} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default VoucherPageCustomer;
