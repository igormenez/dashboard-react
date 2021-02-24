import React from 'react';
import {Switch,Route} from 'react-router-dom';

import Dashboard from '../page/Dashboard';
import List from '../page/List';
import Layout from '../components/Layout';


const AppRoutes: React.FC = () =>(
  <Layout>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/list/:type" exact component={List} />
    </Switch>
  </Layout>
);
export default AppRoutes;