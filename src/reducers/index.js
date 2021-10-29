<<<<<<< HEAD
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'
import SignUp from './SignUp';
import Auth from './Auth';
import Brands from './Brands';
import Company from './Company';
import Admin from './Admin';
import Model from './Model';
import Statistics from './Statistics';




export default (history) => combineReducers({
  loadingBar: loadingBarReducer,
  router: connectRouter(history),
  signUp:SignUp,
  auth:Auth,
  brands:Brands,
  company:Company,
  admin:Admin,
  model:Model,
  stats:Statistics
});
=======
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'
import SignUp from './SignUp';
import Auth from './Auth';
import Brands from './Brands';
import Company from './Company';
import Admin from './Admin';
import Model from './Model';
import Statistics from './Statistics';




export default (history) => combineReducers({
  loadingBar: loadingBarReducer,
  router: connectRouter(history),
  signUp:SignUp,
  auth:Auth,
  brands:Brands,
  company:Company,
  admin:Admin,
  model:Model,
  stats:Statistics
});
>>>>>>> e7378db40bd8bd8325ec48c0e53f0cc4922dadbf
