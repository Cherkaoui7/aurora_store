import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

// API_URL: empty string = same-origin (Vercel). For local dev, set VITE_API_URL or REACT_APP_API_URL
export const API_URL = (import.meta.env && import.meta.env.VITE_API_URL) || (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) || '';

const ShopContextProvider = (props) => {

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Customer Authentication State
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Fetch products from Backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Backend Error:", error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // Cart key format: "productId_size" (e.g. "abc123_M")
  const addToCart = (itemId, size = 'default') => {
    const cartKey = `${itemId}_${size}`;
    setCartItems((prev) => ({ ...prev, [cartKey]: (prev[cartKey] || 0) + 1 }));
  };

  const removeFromCart = (cartKey) => {
    setCartItems((prev) => {
      const newCount = (prev[cartKey] || 0) - 1;
      if (newCount <= 0) {
        const { [cartKey]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [cartKey]: newCount };
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const toggleWishlist = (itemId) => {
    setWishlistItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const contextValue = {
    all_products: products,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartItems,
    wishlistItems,
    toggleWishlist,
    search, setSearch,
    showSearch, setShowSearch,
    token, user, login, logout,
    API_URL
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
