import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import HistoryCustomer from './pages/HistoryCustomer';
import InformationCustomer from './pages/Information';

function Customer() {
    const match = useRouteMatch();
    return (
      <Switch>
        <Route path={`${match.url}/history`} exact component={HistoryCustomer} />
        <Route path={`${match.url}/infor`} exact component={InformationCustomer} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    );
}

export default Customer
