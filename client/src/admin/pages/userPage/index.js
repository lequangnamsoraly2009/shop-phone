import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DetailUser from "./pages/detailUser";
import MainUser from "./pages/mainUser";

function UserPage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={MainUser} />
      <Route path={`${match.url}/:id`} component={DetailUser} />
    </Switch>
  );
}

export default UserPage;
