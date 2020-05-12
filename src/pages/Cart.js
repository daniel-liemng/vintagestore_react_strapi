import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';

import EmptyCart from '../components/Cart/EmptyCart';
import CartItem from '../components/Cart/CartItem';

const Cart = () => {
  const { cart, total, clearCart } = useContext(CartContext);

  // let user = false;
  const { user } = useContext(UserContext);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className='cart-items section'>
      <h2>your cart</h2>
      <button
        onClick={() => clearCart()}
        type='button'
        className='btn btn-primary'
      >
        clear cart
      </button>
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <h2>total: $ {total}</h2>

      {user.token ? (
        <Link to='/checkout' className='btn btn-primary btn-block'>
          check out
        </Link>
      ) : (
        <Link to='/login' className='btn btn-primary btn-block'>
          login
        </Link>
      )}
    </section>
  );
};

export default Cart;
