import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CreateProduct from "./pages/createProduct";
import MainProduct from "./pages/mainProduct";

function ProductPage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={MainProduct} />
      <Route path={`${match.url}/create`} component={CreateProduct} />
      <Route path={`${match.url}/edit/:id`} component={CreateProduct} />
    </Switch>
  );
}

export default ProductPage;
