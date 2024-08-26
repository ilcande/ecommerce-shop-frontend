// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, selectedOptions, totalPrice) => {
    setCart((prevCart) => [
      ...prevCart,
      { id: `${product.id}-${JSON.stringify(selectedOptions)}`, product, quantity, selectedOptions, totalPrice }
    ]);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== cartItemId));
  };

  const getCartItemCount = () => cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
