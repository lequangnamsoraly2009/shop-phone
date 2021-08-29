import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PageNotFound from '../../components/pagenotfound';
import Device from './pages/Device';
import HistoryCustomer from './pages/HistoryCustomer';
import HistoryOrder from './pages/HistoryOrder';
import InformationCustomer from './pages/Information';
import VoucherUser from './pages/VoucherUser';

function Customer() {
    const match = useRouteMatch();
    return (
      <Switch>
        <Route path={`${match.url}/history`} exact component={HistoryCustomer} />
        <Route path={`${match.url}/history/:id`} exact component={HistoryOrder} />
        <Route path={`${match.url}/infor`} exact component={InformationCustomer} />
        <Route path={`${match.url}/voucher`} exact component={VoucherUser} />
        <Route path={`${match.url}/device`} exact component={Device} />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    );
}

export default Customer
