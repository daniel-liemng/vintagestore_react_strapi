import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='error-page section'>
      <div className='error-container'>
        <h1>oop!!! page not found</h1>
        <Link to='home' className='btn btn-primary'>
          back home
        </Link>
      </div>
    </div>
  );
};

export default Error;
