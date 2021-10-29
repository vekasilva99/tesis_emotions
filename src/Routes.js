<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import App from "./App";
import Blazeface from "./containers/blazeface";
import ManuelModel from "./containers/ManuelModel";
import Embedding from "./containers/Embedding";
import Home from "./containers/Home";
import JoinUs from "./containers/JoinUs";
import SignIn from "./containers/SignIn";
import SignInCompany from "./containers/SignInCompany";
import SignUp from "./containers/SignUp";
import NoAccount from "./containers/NoAccount";
import BrandDetail from "./containers/BrandDetail";
import VideoDetail from "./containers/VideoDetail";
import VideoWatch from "./containers/VideoWatch";
import VideoStatistics from "./containers/VideoStatistics";
import Emotions from "./containers/Emotions";
import HomeCompany from "./containers/HomeCompany";
import { fetchUserRequest } from "./actions/index";
import GuardRoutesUser from "./helpers/GuardRoutesUser";
import GuardRoutesCompany from "./helpers/GuardRoutesCompany";
import GuardRoutesAdmin from "./helpers/GuardRoutesAdmin";
>>>>>>> 2acdec8... Login
// import ProtectedRoute from './ProtectedRoute'

function Routes() {
  const { token, _id, role,loader } = useSelector((state) => ({
    ...state.auth,
  }));
  const state = useSelector((state) => ({
    state,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
 
    if (token && _id && role === null) {
      dispatch(fetchUserRequest(_id));
    }
  }, [role]);

  return (
    <div className="Routes">
      {role ? (
        <Switch>
<<<<<<< HEAD
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
=======
          <GuardRoutesUser
            role={role}
            exact
            path="/blazeface"
            component={Blazeface}
          />
          ,
          <GuardRoutesUser
            role={role}
            exact
            path="/manuel"
            component={ManuelModel}
          />
          ,
          <GuardRoutesUser
            role={role}
            exact
            path="/embedding"
            component={Embedding}
          />
          ,
          <GuardRoutesCompany
            role={role}
            exact
            path="/emotions"
            component={Emotions}
          />
          ,
          <GuardRoutesUser
            role={role}
            exact
            path="/brand/:id/:video/watch"
            component={VideoWatch}
          />
          ,
          <GuardRoutesCompany
            role={role}
            exact
            path="/:video/statistics"
            component={VideoStatistics}
          />
<<<<<<< HEAD
          <Redirect exact from="*" to="/home" />
>>>>>>> 2acdec8... Login
=======
       
>>>>>>> c75d24d... Login
        </Switch>
      ) : (
        <>
        {!role && !loader ?
        <Switch>
          <Route exact path="/signin" component={SignIn} />,
          <Route exact path="/signup" component={SignUp} />,
          <Route exact path="/signin-company" component={SignInCompany} />,
          <Route exact path="/join-us" component={JoinUs} />,
          <Route exact path="/watchvideo" component={NoAccount} />,
        
        </Switch>
        : <div className="full-page-loader">
          <CircularProgress size={100} thickness={5}/></div>}
        </>
      )}
      <Switch>
        <Route exact path="/brand/:id/:video" component={VideoDetail} />,
        <Route exact path="/brand/:id" component={BrandDetail} />,
        <Route exact path="/home" component={Home} />,
        <Route exact path="/homeCompany" component={HomeCompany} />,
        <Route exact path="/embedding" component={Embedding} />,
      </Switch>
    </div>
  );
}

export default Routes;
