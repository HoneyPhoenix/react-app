import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import Login from './containers/login/login'
import Main from './containers/main/main'
import Register from './containers/register/register'
import store from './redux/store';

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/login' component = {Login}></Route>
        <Route path='/register' component = {Register}></Route>
        <Route component = {Main}></Route>
      </Switch>
    </HashRouter>
  </Provider>
  
), document.getElementById('root'));
 