import React, { useState, createContext } from 'react';

const UserContext = createContext();

const getUserFromLocalStorage = () => {
  return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : { username: null, token: null };
};

const UserProvider = ({ children }) => {
  // state
  // const [user, setUser] = useState({ username: null, token: null });
  const [user, setUser] = useState(getUserFromLocalStorage);

  // functions
  const userLogin = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const userLogout = () => {
    setUser({ username: null, token: null });
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
