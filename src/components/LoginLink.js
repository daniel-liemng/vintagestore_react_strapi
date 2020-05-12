import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../context/user';
import { CartContext } from '../context/cart';

const LoginLink = () => {
  const { user, userLogout } = useContext(UserContext);
  const { clearCart } = useContext(CartContext);

  if (user.token) {
    return (
      <button
        onClick={() => {
          userLogout();
          clearCart();
        }}
        type='button'
        className='login-btn'
      >
        logout
      </button>
    );
  }

  return <Link to='/login'>login</Link>;
};

export default LoginLink;
