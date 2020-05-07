import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../../context/cart';

const CartLink = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className='cart-link-container'>
      <Link to='/cart'>Cart</Link>
      <span className='cart-link-total'>{cartItems}</span>
    </div>
  );
};

export default CartLink;
