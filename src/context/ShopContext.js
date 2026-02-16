import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

// API_URL: empty string = same-origin (Vercel). For local dev, set REACT_APP_API_URL=http://localhost:4000
export const API_URL = process.env.REACT_APP_API_URL || '';

const ShopContextProvider = (props) => {

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

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
  }

  useEffect(() => {
    getProductsData();
  }, [])

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
    API_URL
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;