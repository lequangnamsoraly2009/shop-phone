import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
// import CategoryDetail from './pages/categoryDetail';
import Category from './pages/categoryMain';

function CategoryPage() {
    const match = useRouteMatch();
    return (
        <Switch>
      {/* <Redirect exact from="/" to="/home" /> */}
      <Route path={`${match.url}/`} exact component={Category} />
      {/* <Route component={NotFound} /> */}
    </Switch>
    )
}

export default CategoryPage
