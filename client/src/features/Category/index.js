import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PageNotFound from "../../components/pagenotfound";
// import CategoryDetail from './pages/categoryDetail';
import Category from "./pages/categoryMain";

function CategoryPage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={Category} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default CategoryPage;
