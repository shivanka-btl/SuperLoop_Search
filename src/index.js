import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
// core components
import User from 'layouts/User.jsx';
import 'assets/css/material-dashboard-react.css?v=1.6.0';
import reducers from './store/reducers/reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { SnackbarProvider } from 'notistack';


const store = process.env.NODE_ENV === 'development' ?
  createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))
  :
  createStore(reducers, applyMiddleware(thunkMiddleware));

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}> 
    <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      hideIconVariant={false}
      dense={false}
      preventDuplicate
    >
      <Router history={hist}>
        <Switch>
          <Route path="/user" component={User} />
          <Redirect from="/" to="/user/dashboard" />
        </Switch>
      </Router>
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);
