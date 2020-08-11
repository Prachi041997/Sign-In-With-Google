import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Home';
import test from './test';

const Routes = ()=> {
    return <BrowserRouter>
      <Switch>
          <Route path='/home' exact component={Home}></Route>
          <Route path='/' exact component={test}></Route>

      </Switch>
    </BrowserRouter>
}
export default Routes;