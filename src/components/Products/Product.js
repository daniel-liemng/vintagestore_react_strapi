import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import defaultImg from '../../assets/mainBcg.jpeg';

const Product = ({ id, title, price, image }) => {
  return (
    <article className='product'>
      <div className='img-container'>
        <img src={image || defaultImg} alt={title || 'default Title'} />
        <Link to={`/products/${id}`} className='btn btn-primary product-link'>
          Details
        </Link>
      </div>

      <div className='product-footer'>
        <p className='product-title'>{title || 'default title'}</p>
        <p className='product-price'>${price || 0}</p>
      </div>
    </article>
  );
};

Product.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default Product;
