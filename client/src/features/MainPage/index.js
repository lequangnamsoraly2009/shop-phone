import React from 'react'
import {Switch, Route, useRouteMatch } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import DetailProduct from './pages/DetailProduct';


function MainPage() {
    const match = useRouteMatch();
  return (
    <Switch>
      {/* <Redirect exact from="/" to="/home" /> */}
      <Route path={`${match.url}/`} component={DashBoard} />
      <Route path={`${match.url}/:id`} exact component={DetailProduct} />      
      {/* <Route path={`${match.url}/register`} exact component={Register} /> */}
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

export default MainPage
