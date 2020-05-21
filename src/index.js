import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ProductProvider } from './context/products';
import { CartProvider } from './context/cart';
import { UserProvider } from './context/user';
import { AlertProvider } from './context/alert';
import { RootProvider } from './context/root';

ReactDOM.render(
  <RootProvider>
    <AlertProvider>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </AlertProvider>
  </RootProvider>,
  document.getElementById('root')
);
