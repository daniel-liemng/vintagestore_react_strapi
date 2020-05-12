import React, { useState, createContext } from 'react';

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  // state
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: 'success',
  });

  // function
  const showAlert = ({ msg, type = 'success' }) => {
    setAlert({ show: true, msg, type });
  };

  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };
  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
