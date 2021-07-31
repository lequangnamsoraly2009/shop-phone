import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CreateCategory from "./pages/createCategory";
import MainCategory from "./pages/mainPageCategory";

function CategoryPage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={MainCategory} />
      <Route path={`${match.url}/create`} component={CreateCategory} />
      <Route path={`${match.url}/edit/:id`} component={CreateCategory} />
    </Switch>
  );
}

export default CategoryPage;
