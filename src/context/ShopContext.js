import React, { createContext, useState } from "react";
import { all_products } from "../assets/all_products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  // Initialize cart with all product IDs set to 0
  all_products.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};

const ShopContextProvider = (props) => {
  // State to hold cart items { itemId: quantity }
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Function to Add to Cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    console.log("Cart Items:", cartItems); // Helpful for debugging
  };

  // Function to Remove from Cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  // Function to calculate total number of items in cart (for the badge)
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  // Value passed to all components
  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;