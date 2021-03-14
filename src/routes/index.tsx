import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Debit from '../pages/Debit';
import Debits from '../pages/Debits';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/debit" component={Debit} />
    <Route path="/debits" component={Debits} />
  </Switch>
);

export default Routes;
