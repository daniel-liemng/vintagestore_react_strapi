import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ProductProvider } from './context/products';
import { CartProvider } from './context/cart';
import { UserProvider } from './context/user';
import { AlertProvider } from './context/alert';

ReactDOM.render(
  <AlertProvider>
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  </AlertProvider>,
  document.getElementById('root')
);
