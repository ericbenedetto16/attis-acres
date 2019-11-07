import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './layouts/assets/css/index.css';
import { Provider } from 'react-redux';
import Header from './layouts/partials/Header';
import Footer from './layouts/partials/Footer';
import FrontPage from './layouts/templates/FrontPage';
import Single from './layouts/templates/Single';
import Page from './layouts/templates/Page';
import Product from './layouts/templates/Product';
import Archive from './layouts/templates/Archive';
import NotFound from './layouts/templates/404';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import './layouts/assets/css/master.css';

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/wpTest/" component={FrontPage} />
          <Route exact path="/wpTest/products/" component={Product} />
          <Route exact path="/wpTest/products/:slug" component={Product} />
          <Route exact path="/wpTest/archive/:slug" component={Archive} />
          <Route exact path="/wpTest/post/:slug" component={Single} />
          <Route exact path="/wpTest/:slug" component={Page} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  </>,
  document.getElementById('root'),
);

serviceWorker.unregister();
