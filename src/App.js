import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Error from './pages/Error';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';

import Header from './components/Header';
import Alert from './components/Alert';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Header />
      <Alert />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/cart' component={Cart} />
        {/* <Route path='/checkout' component={Checkout} /> */}
        <PrivateRoute path='/checkout' name='dfd' dfd='fdfd98'>
          <Checkout />
        </PrivateRoute>
        <Route path='/login' component={Login} />
        <Route exact path='/products' component={Products} />
        <Route path='/products/:id' children={<ProductDetails />} />
        <Route path='*' component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
