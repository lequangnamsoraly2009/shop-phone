import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PageNotFound from '../../components/pagenotfound';
import HistoryCustomer from './pages/HistoryCustomer';
import HistoryOrder from './pages/HistoryOrder';
import InformationCustomer from './pages/Information';

function Customer() {
    const match = useRouteMatch();
    return (
      <Switch>
        <Route path={`${match.url}/history`} exact component={HistoryCustomer} />
        <Route path={`${match.url}/history/:id`} exact component={HistoryOrder} />
        <Route path={`${match.url}/infor`} exact component={InformationCustomer} />
        <Route component={PageNotFound} />
      </Switch>
    );
}

export default Customer
