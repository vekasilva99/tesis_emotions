import React, { useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
import Blazeface from './containers/blazeface';
import ManuelModel from './containers/ManuelModel';
import Embedding from './containers/Embedding';
import Home from './containers/Home'
import JoinUs from './containers/JoinUs'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'
import NoAccount from './containers/NoAccount'
import BrandDetail from './containers/BrandDetail'
import VideoDetail from './containers/VideoDetail'
import VideoWatch from './containers/VideoWatch'
import VideoStatistics from './containers/VideoStatistics'
import Emotions from './containers/Emotions'
import Prueba from './prueba';
// import ProtectedRoute from './ProtectedRoute'

function Routes() {

  return (
    <div className="Routes">

        <Switch>
          {/* Users */}
          {/* <Route exact path="/" component={App}/>, */}
          <Route exact path="/home" component={Home}/>,
          <Route exact path="/join-us" component={JoinUs}/>,
          <Route exact path="/blazeface" component={Blazeface}/>,
          <Route exact path="/manuel" component={ManuelModel}/>,
          <Route exact path="/embedding" component={Embedding}/>,
          <Route exact path="/watchvideo" component={NoAccount}/>,
          <Route exact path="/signin" component={SignIn}/>,
          <Route exact path="/brand/:id" component={BrandDetail}/>,
          <Route exact path="/emotions" component={Emotions}/>,
          <Route exact path="/brand/:id/:video" component={VideoDetail}/>,
          <Route exact path="/brand/:id/:video/watch" component={VideoWatch}/>,
          <Route exact path="/:video/statistics" component={VideoStatistics}/>,
          {/* <ProtectedRoute exact path="/:landing/main" role={isUser} component={UserMain}/>, */}

          <Route exact path="/prueba" component={Prueba}/>,
        </Switch>

    </div>
  );
}

export default Routes;