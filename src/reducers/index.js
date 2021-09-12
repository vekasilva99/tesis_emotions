import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'
import SignUp from './SignUp';
import Auth from './Auth';






export default (history) => combineReducers({
  loadingBar: loadingBarReducer,
  router: connectRouter(history),
  signUp:SignUp,
  auth:Auth,
  

});
