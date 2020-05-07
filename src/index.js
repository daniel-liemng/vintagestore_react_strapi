import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ProductProvider } from './context/products';
import { CartProvider } from './context/cart';

ReactDOM.render(
  <ProductProvider>
    <CartProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CartProvider>
  </ProductProvider>,
  document.getElementById('root')
);
