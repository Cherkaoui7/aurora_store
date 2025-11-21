import React, { createContext, useEffect, useState } from "react";
import axios from "axios"; 
// ❌ Removed import { all_products } ...

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  
  // 1. State to hold products from Database
  const [products, setProducts] = useState([]); // Default empty array
  
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // 2. Function to Fetch Data from Backend
  const getProductsData = async () => {
    try {
        // Make sure your backend is running on 4000
        const response = await axios.get('http://localhost:4000/api/product/list');
        if (response.data.success) {
            setProducts(response.data.products); // Save DB data to state
        }
    } catch (error) {
        console.log("Backend Error:", error);
    }
  }

  // 3. Run on Load
  useEffect(() => {
    getProductsData();
  }, [])


  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
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
    all_products: products, // ✅ Map the new state to the old variable name so pages don't break
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    wishlistItems,
    toggleWishlist,
    search, setSearch,
    showSearch, setShowSearch
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;