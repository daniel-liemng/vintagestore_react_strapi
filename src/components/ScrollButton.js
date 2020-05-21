import React, { useContext } from 'react';

import { FaAngleDoubleUp } from 'react-icons/fa';

import { RootContext } from '../context/root';

const ScrollButton = () => {
  // const height = 200;

  const { height } = useContext(RootContext);

  const scrollBackToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollBackToTop}
      className={height > 100 ? 'scroll-btn show-scroll-btn' : 'scroll-btn'}
    >
      <FaAngleDoubleUp />
    </button>
  );
};

export default ScrollButton;
