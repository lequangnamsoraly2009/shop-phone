import React from 'react'
import { Redirect,Switch, Route, useRouteMatch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function AuthPage() {
    const match = useRouteMatch();
  return (
    <Switch>
      <Redirect exact from="/buyer" to="/" />
      <Route path={`${match.url}/login`} exact component={Login} />
      <Route path={`${match.url}/register`} exact component={Register} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

export default AuthPage
