import React, { useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import Blazeface from './containers/blazeface';
import ManuelModel from './containers/ManuelModel';
import Embedding from './containers/Embedding';
import Home from './containers/Home'
// import ProtectedRoute from './ProtectedRoute'

function Routes() {

  return (
    <div className="Routes">

        <Switch>
          {/* Users */}
          {/* <Route exact path="/" component={App}/>, */}
          <Route exact path="/home" component={Home}/>,
          <Route exact path="/blazeface" component={Blazeface}/>,
          <Route exact path="/manuel" component={ManuelModel}/>,
          <Route exact path="/embedding" component={Embedding}/>,
          {/* <ProtectedRoute exact path="/:landing/main" role={isUser} component={UserMain}/>, */}
        </Switch>

    </div>
  );
}

export default Routes;