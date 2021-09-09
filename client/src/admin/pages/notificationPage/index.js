import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import NotificationMainPage from "./mainPage";

function NotificationPage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={NotificationMainPage} />
      {/* <Route path={`${match.url}/:id`} component={DetailOrder} /> */}
    </Switch>
  );
}

export default NotificationPage;
