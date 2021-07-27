import React from 'react'
import { Redirect,Switch, Route, useRouteMatch } from 'react-router-dom';
import PageNotFound from '../../components/pagenotfound';
import ActivateUser from './pages/ActivateUser';
import Login from './pages/Login';
import Register from './pages/Register';

function AuthPage() {
    const match = useRouteMatch();
  return (
    <Switch>
      <Redirect exact from="/buyer" to="/" />
      <Route path={`${match.url}/login`} exact component={Login} />
      <Route path={`${match.url}/register`} exact component={Register} />
      <Route path={`${match.url}/activated`} exact component={ActivateUser} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default AuthPage
