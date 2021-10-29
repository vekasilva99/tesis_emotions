import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import { loadingBarReducer } from 'react-redux-loading-bar'




export default (history) => combineReducers({
  loadingBar: loadingBarReducer,
  router: connectRouter(history),

});
