import {applyMiddleware, compose, createStore} from 'redux';
import reducers from '../reducers/index';
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';
import { loadingBarMiddleware } from 'react-redux-loading-bar'

const basenameUri = process.env.REACT_APP_BASE_NAME || '';
const history = createBrowserHistory({basename: "/"});
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const loadingMiddleware = loadingBarMiddleware({
  promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
})

const middlewares = [sagaMiddleware, routeMiddleware,loadingBarMiddleware()];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const store = createStore(reducers(history),
    composeEnhancers(applyMiddleware(...middlewares)));
    

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
  
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
export {history};