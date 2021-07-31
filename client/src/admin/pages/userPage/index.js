import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MainUser from "./pages/mainUser";

function UserPage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={MainUser} />
      {/* <Route path={`${match.url}/create`} component={CreateCategory} /> */}
      {/* <Route path={`${match.url}/edit/:id`} component={CreateCategory} /> */}
    </Switch>
  );
}

export default UserPage;
