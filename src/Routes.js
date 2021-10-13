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
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import App from "./App";
import Blazeface from "./containers/blazeface";
import ManuelModel from "./containers/ManuelModel";
import Embedding from "./containers/Embedding";
import Home from "./containers/Home";
import HomeAdmin from "./containers/HomeAdmin";
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
import EmotionDetail from "./containers/EmotionDetail";
import HomeCompany from "./containers/HomeCompany";
import { fetchUserRequest, signOut } from "./actions/index";
import GuardRoutesUser from "./helpers/GuardRoutesUser";
import GuardRoutesUserAdmin from "./helpers/GuardRoutesUserAdmin";
import GuardRoutesCompany from "./helpers/GuardRoutesCompany";
import WatchVideoRoute from "./helpers/WatchVideoRoute";
import GuardRoutesAdmin from "./helpers/GuardRoutesAdmin";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 2acdec8... Login
=======
import NoRoleRoute from "./helpers/NoRoleRoute";
import Prueba from "./prueba";
import { RiLogoutCircleRFill } from "react-icons/ri";
>>>>>>> 2f4effd... Stats
=======
import TestModel from "./containers/TestModel"
import TestModelAttention from "./containers/TestModelAttention"
import AllVideos from "./containers/AllVideos"
import EditUser from "./containers/EditUser"
import NoRoleRoute from "./helpers/NoRoleRoute";
import Prueba from "./prueba";
import { RiLogoutCircleRFill } from "react-icons/ri";
import EditCompany from "./containers/EditCompany";
>>>>>>> 0f9f13c... M
// import ProtectedRoute from './ProtectedRoute'

function Routes(props) {
  const history = useHistory();
  const location = useLocation();


  const { token, _id, role, loader } = useSelector((state) => ({
    ...state.auth,
  }));
  const state = useSelector((state) => ({
    state,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (token && role === null) {
      dispatch(fetchUserRequest(token));
    }
  }, [role]);
  if (location.pathname === '/') {
    return (<Redirect to={'/home'}/>);

  }
console.log("Admin",role)
  return (
    <div className="Routes">
      {role ? (
<<<<<<< HEAD
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
          {/* <GuardRoutesUser
=======
        <>
          <Switch>
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
            {/* <GuardRoutesUser
>>>>>>> 2f4effd... Stats
            role={role}
            exact
            path="/embedding"
            component={Embedding}
          /> */}
<<<<<<< HEAD
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
=======
            ,
            <GuardRoutesCompany
              role={role}
              exact
              path="/emotions"
              component={Emotions}
            />
                <GuardRoutesCompany
              role={role}
              exact
              path="/emotion/:emotionId"
              component={EmotionDetail}
            />
            , ,
            <GuardRoutesCompany
              role={role}
              exact
              path="/:video/statistics"
              component={VideoStatistics}
            />
            <GuardRoutesCompany
              role={role}
              exact
              path="/homeCompany"
              component={HomeCompany}
            />
              <GuardRoutesCompany
              role={role}
              exact
              path="/testModel"
              component={TestModel}
            />
               <GuardRoutesCompany
              role={role}
              exact
              path="/testModelAttention"
              component={TestModelAttention}
            />
               <GuardRoutesCompany
              role={role}
              exact
              path="/videos"
              component={AllVideos}
            />
            ,
  
            <GuardRoutesUserAdmin
              role={role}
              exact
              path="/profile"
              component={EditUser}
            />
        
               <GuardRoutesCompany
              role={role}
              exact
              path="/profile/company"
              component={EditCompany}
            />
                 <GuardRoutesAdmin role={role} exact path="/homeAdmin" component={HomeAdmin} />
          </Switch>
          <div className={"sign-out-container"}>
            <h3
              onClick={() => {
                dispatch(signOut({ history: history }));
              }}
            >
              Log Out
            </h3>
          </div>
        </>
>>>>>>> 2f4effd... Stats
      ) : (
        <>
          {loader ? (
            <div className="full-page-loader">
              <CircularProgress size={100} thickness={5} />
            </div>
          ) : null}
        </>
      )}
      <Switch>
        <WatchVideoRoute
          role={role}
          exact
          path="/brand/:id/:videoId/watch"
          component={VideoWatch}
        />
        <Route exact path="/brand/:id" component={BrandDetail} />,
        <Route exact path="/brand/:id/:videoId" component={VideoDetail} />,
        <Route exact path="/home" component={Home} />,
       
        <Route exact path="/embedding" component={Embedding} />,
<<<<<<< HEAD
=======
        <Route exact path="/prueba" component={Prueba} />,
      
        <NoRoleRoute role={role} exact path="/signin" component={SignIn} />,
        <NoRoleRoute role={role} exact path="/signup" component={SignUp} />,
        <NoRoleRoute
          role={role}
          exact
          path="/signin-company"
          component={SignInCompany}
        />
        ,
        <NoRoleRoute role={role} exact path="/join-us" component={JoinUs} />,
        <NoRoleRoute
          role={role}
          exact
          path="/watchvideo/:id/:videoId"
          component={NoAccount}
        />
        ,
>>>>>>> 2f4effd... Stats
      </Switch>
      {loader && role ? (
        <div className="full-page-loader">
          <CircularProgress size={100} thickness={5} />
        </div>
      ) : null}
    </div>
  );
}

export default Routes;
