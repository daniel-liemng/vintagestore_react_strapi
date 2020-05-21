import React, { useContext } from 'react';

import { ProductContext } from '../context/products';

import Loading from '../components/Loading';
// import ProductList from '../components/Products/ProductList';
import Filters from '../components/Products/Filters';
import PageProducts from '../components/Products/PageProducts';

const Products = () => {
  const { loading, sorted } = useContext(ProductContext);

  if (loading) {
    return <Loading />;
  }

  // return <ProductList title='our products' products={sorted}></ProductList>;

  return (
    <>
      <Filters />
      <PageProducts />
    </>
  );
};

export default Products;
