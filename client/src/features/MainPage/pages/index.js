import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PageNotFound from "../../../components/pagenotfound";
import DetailProduct from "./DetailProduct";

function DetailProductMain() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/:id`} exact component={DetailProduct} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default DetailProductMain;
