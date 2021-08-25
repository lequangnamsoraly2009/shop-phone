import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DetailVoucher from "./pages/detailVoucher";
import VoucherMainPage from "./pages/mainPage";

function VoucherPage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={VoucherMainPage} />
      <Route path={`${match.url}/detail/:id`} component={DetailVoucher} />
    </Switch>
  );
}

export default VoucherPage;
