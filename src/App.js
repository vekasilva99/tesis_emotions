import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import configureStore, { history } from './store';
import CacheBuster from './CacheBuster';
import Routes from './Routes';
export const store = configureStore();
require('dotenv').config()

function App() {

  return (
    <Provider store={store}>
    <ConnectedRouter history={history}>    
              <Switch>
                <Route path="/" component={Routes} />
              </Switch>
    </ConnectedRouter>
    </Provider>
  );
}

export default App;
