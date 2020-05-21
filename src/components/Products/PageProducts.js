import React, { useContext } from 'react';

import { ProductContext } from '../../context/products';

import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

import ProductList from './ProductList';
// import Loading from '../Loading';

const PageProducts = () => {
  const { sorted, page, changePage } = useContext(ProductContext);
  // console.log(sorted);

  if (!sorted[page]) {
    return (
      <h3 className='search-errors'>
        unfortunately, your search did not return any products
      </h3>
    );
  }

  return (
    <>
      <ProductList products={sorted[page]} />
      {sorted.length > 1 && (
        <article className='pagination-buttons'>
          {/* prev */}
          {page > 0 && (
            <button
              onClick={() => changePage(page - 1)}
              className='prev-page-btn'
            >
              <FaAngleDoubleLeft />
            </button>
          )}

          {/* all page buttons */}
          {sorted.map((_, index) => {
            return (
              <button
                onClick={() => changePage(index)}
                className={`page-btn ${page === index && `page-btn-current`}`}
                key={index}
              >
                {index + 1}
              </button>
            );
          })}

          {/* next */}
          {page < sorted.length - 1 && (
            <button
              onClick={() => changePage(page + 1)}
              className='next-page-btn'
            >
              <FaAngleDoubleRight />
            </button>
          )}
        </article>
      )}
    </>
  );
};

export default PageProducts;
