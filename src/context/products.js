import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import url from '../utils/URL';
import { featuredProducts, flattenProducts, paginate } from '../utils/helpers';

const ProductContext = createContext();

// Provider / Consumer / useContext()

const ProductProvider = ({ children }) => {
  // state
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  // extra state
  const [sorted, setSorted] = useState([]);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    shipping: false,
    price: 'all',
  });

  // useEffect for fetching data when component is mounted
  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then((res) => {
      // const featured = featuredProducts(res.data);
      const featured = featuredProducts(flattenProducts(res.data));
      const formattedProducts = flattenProducts(res.data);

      // setProducts(res.data);
      // setSorted(formattedProducts);

      setSorted(paginate(formattedProducts));
      setProducts(formattedProducts);
      setFeatured(featured);
      setLoading(false);
    });

    return () => {};
  }, []);

  // useEffect for filtering with the dependency of array of filters and products
  useEffect(() => {
    let newProducts = [...products].sort((a, b) => a.price - b.price);
    const { search, category, shipping, price } = filters;

    // logic
    if (category !== 'all') {
      newProducts = newProducts.filter((item) => item.category === category);
    }

    if (shipping !== false) {
      newProducts = newProducts.filter(
        (item) => item.free_shipping === shipping
      );
    }

    if (search !== '') {
      newProducts = newProducts.filter((item) => {
        let title = item.title.toLowerCase().trim();
        return title.startsWith(search) ? item : null;
      });
    }

    if (price !== 'all') {
      newProducts = newProducts.filter((item) => {
        if (price === 0) {
          return item.price < 300;
        } else if (price === 300) {
          return item.price > 300 && item.price < 650;
        } else {
          return item.price > 650;
        }
      });
    }

    setPage(0);
    setSorted(paginate(newProducts));
  }, [filters, products]);

  // functions
  const changePage = (index) => {
    setPage(index);
  };

  const updateFilters = (e) => {
    const type = e.target.type;
    const filter = e.target.name;
    const value = e.target.value;

    console.log(type, filter, value);

    let filterValue;
    if (type === 'checkbox') {
      filterValue = e.target.checked;
    } else if (type === 'radio') {
      value === 'all' ? (filterValue = value) : (filterValue = parseInt(value));
    } else {
      filterValue = value;
    }

    // setFilters({ ...filters, [filter]: value });
    setFilters({ ...filters, [filter]: filterValue });
  };

  return (
    <ProductContext.Provider
      value={{
        loading,
        products,
        featured,
        sorted,
        page,
        filters,
        changePage,
        updateFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
