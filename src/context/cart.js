import React, { createContext, useState, useEffect } from 'react';

// import localCart from '../utils/localCart';

const CartContext = createContext();

const getCartFromLocalStorage = () => {
  return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getCartFromLocalStorage);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    // 1. local storage - later
    localStorage.setItem('cart', JSON.stringify(cart));

    // 2. calculate cartItems
    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);

    setCartItems(newCartItems);

    // 3. calculate total
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);

    newTotal = parseFloat(newTotal).toFixed(2);

    setTotal(newTotal);
  }, [cart]);

  // remove item
  const removeItem = (id) => {
    let newCart = [...cart].filter((item) => item.id !== id);

    setCart(newCart);

    // Shorter way
    // setCart([...cart].filter((item) => item.id !== id))
  };

  // increase amount
  const increaseAmount = (id) => {
    const newCart = [...cart].map((item) => {
      if (item.id === id) {
        item.amount += 1;
      }
      return item;
    });

    setCart(newCart);
  };

  // decrease amount
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      removeItem(id);
      return;
    } else {
      const newCart = [...cart].map((item) => {
        return item.id === id
          ? { ...item, amount: item.amount - 1 }
          : { ...item };
      });
      setCart(newCart);
    }
  };

  // add to cart
  const addToCart = (product) => {
    const { id, title, image, price } = product;

    // 1. check if added item is in the cart already
    const item = [...cart].find((item) => item.id === id);

    // 2. if item exists -> increaseAmount, if not, add new item to cart
    if (item) {
      increaseAmount(id);
      return;
    } else {
      const newItem = { id, title, price, image, amount: 1 };
      const newCart = [...cart, newItem];

      setCart(newCart);
    }
  };

  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
