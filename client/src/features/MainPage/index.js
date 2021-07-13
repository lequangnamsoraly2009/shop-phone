import React from 'react'
import {Switch, Route, useRouteMatch } from 'react-router-dom';
import DashBoard from './pages/DashBoard';


function MainPage() {
    const match = useRouteMatch();
  return (
    <Switch>
      {/* <Redirect exact from="/" to="/" /> */}
      <Route path={`${match.url}/`} exact component={DashBoard} />
      {/* <Route path={`${match.url}/register`} exact component={Register} /> */}
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

export default MainPage
