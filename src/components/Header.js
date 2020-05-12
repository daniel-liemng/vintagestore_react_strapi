import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../context/user';

import logo from '../assets/logo.svg';
import CartLink from '../components/Cart/CartLink';
import LoginLink from '../components/LoginLink';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className='header'>
      <img src={logo} alt='logo' className='logo' />
      <nav>
        <ul>
          <div>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/products'>Products</Link>
            </li>
            {user.token && (
              <li>
                <Link to='/checkout'>Check out</Link>
              </li>
            )}
          </div>
          <div>
            {/* <li>
              <Link to='/login'>Login</Link>
            </li> */}
            {/* <li>
              <Link to='/cart'>Cart</Link>
            </li> */}
            <LoginLink />
            <CartLink />
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
