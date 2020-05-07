import React from 'react';

import loadingGif from '../assets/loading.gif';

const Loading = () => {
  return (
    <div className='loading'>
      <h2>loading...</h2>
      <img src={loadingGif} alt='loading' />
    </div>
  );
};

export default Loading;
