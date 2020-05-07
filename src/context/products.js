import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import url from '../utils/URL';
import { featuredProducts } from '../utils/helpers';

const ProductContext = createContext();

// Provider / Consumer / useContext()

const ProductProvider = ({ children }) => {
  // state
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then((res) => {
      const featured = featuredProducts(res.data);

      setProducts(res.data);
      setFeatured(featured);
      setLoading(false);
    });

    return () => {};
  }, []);

  return (
    <ProductContext.Provider value={{ loading, products, featured }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
