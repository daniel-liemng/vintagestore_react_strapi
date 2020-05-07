import React, { useContext } from 'react';

import { CartContext } from '../../context/cart';

import { FaAngleDoubleUp, FaAngleDoubleDown } from 'react-icons/fa';

const CartItem = ({ id, title, image, price, amount }) => {
  const { removeItem, increaseAmount, decreaseAmount } = useContext(
    CartContext
  );

  return (
    <article className='cart-item'>
      <img src={image} alt={title} />
      <div>
        <h4>{title}</h4>
        <h5>${price}</h5>
        <button
          onClick={() => removeItem(id)}
          type='button'
          className='cart-btn remove-btn'
        >
          remove
        </button>
      </div>
      <div>
        <button
          onClick={() => increaseAmount(id)}
          type='button'
          className='amount-btn cart-btn'
        >
          <FaAngleDoubleUp />
        </button>
        <p className='item-amount'>{amount}</p>
        <button
          onClick={() => decreaseAmount(id, amount)}
          type='button'
          className='amount-btn cart-btn'
        >
          <FaAngleDoubleDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
