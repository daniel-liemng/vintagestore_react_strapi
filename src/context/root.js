import React, { createContext, useState, useEffect } from 'react';

const RootContext = createContext();

const RootProvider = ({ children }) => {
  // state
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      // set the current positon in the page
      setHeight(window.pageYOffset);
    });
    // clean-up function
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  });

  return (
    <RootContext.Provider value={{ height }}>{children}</RootContext.Provider>
  );
};

export { RootProvider, RootContext };
