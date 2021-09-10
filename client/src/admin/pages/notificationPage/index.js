import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import CreateNotification from "./createNotification";
import NotificationMainPage from "./mainPage";

function NotificationPage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={NotificationMainPage} />
      <Route path={`${match.url}/create`} component={CreateNotification} />
    </Switch>
  );
}

export default NotificationPage;
