import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { all_products as defaultProducts } from "../assets/all_products";

export const ShopContext = createContext(null);

// API_URL: empty string = same-origin (Vercel). For local dev, set VITE_API_URL or REACT_APP_API_URL
export const API_URL = (import.meta.env && import.meta.env.VITE_API_URL) || (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) || '';

/**
 * Normalizes product items so both standard (_id, name, image array)
 * and legacy/mock properties (id, title, string image) are seamlessly supported.
 */
export const normalizeProduct = (item) => {
  if (!item) return null;
  const id = String(item._id || item.id || `prod_${Math.random().toString(36).substring(2, 9)}`);
  const name = item.name || item.title || 'Product';
  const rawImage = item.image;
  const image = Array.isArray(rawImage)
    ? (rawImage.length > 0 ? rawImage : ['/placeholder.png'])
    : [rawImage || '/placeholder.png'];

  return {
    ...item,
    _id: id,
    id: id,
    name: name,
    title: name,
    price: Number(item.price) || 0,
    category: item.category || 'Men',
    subCategory: item.subCategory || 'Topwear',
    description: item.description || '',
    sizes: Array.isArray(item.sizes) && item.sizes.length > 0 ? item.sizes : ["S", "M", "L", "XL"],
    bestseller: Boolean(item.bestseller),
    rating: Number(item.rating) || 4,
    image: image
  };
};

const ShopContextProvider = (props) => {
  // Pre-seed products from localStorage or fallback catalog so the store is instantly populated
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('aurora_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeProduct).filter(Boolean);
        }
      }
    } catch (_) {}
    const defaults = defaultProducts.map(normalizeProduct).filter(Boolean);
    try {
      localStorage.setItem('aurora_products', JSON.stringify(defaults));
    } catch (_) {}
    return defaults;
  });

  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

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

  // Fetch products from Backend with graceful offline fallback
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/product/list`, { timeout: 4000 });
      if (response && response.data && response.data.success && Array.isArray(response.data.products) && response.data.products.length > 0) {
        const normalizedList = response.data.products.map(normalizeProduct).filter(Boolean);
        setProducts(normalizedList);
        localStorage.setItem('aurora_products', JSON.stringify(normalizedList));
        setIsOfflineMode(false);
      }
    } catch (error) {
      // Backend unavailable or 500 error: switch gracefully to local storage fallback mode
      setIsOfflineMode(true);
      console.info("[AURORA] Mode Hors-ligne / LocalStorage actif (Backend indisponible).");
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

  // LocalStorage Helper for Orders
  const placeMockOrder = (orderData) => {
    try {
      const existing = JSON.parse(localStorage.getItem('aurora_orders') || '[]');
      const newOrder = {
        _id: 'ord_' + Date.now(),
        ...orderData,
        date: orderData.date || Date.now(),
        status: orderData.status || 'Order Placed'
      };
      existing.unshift(newOrder);
      localStorage.setItem('aurora_orders', JSON.stringify(existing));
      return { success: true, order: newOrder };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // LocalStorage Helper for Fetching Orders
  const getMockOrders = (userIdOrEmail) => {
    try {
      const existing = JSON.parse(localStorage.getItem('aurora_orders') || '[]');
      if (!userIdOrEmail) return existing;
      const target = String(userIdOrEmail).toLowerCase();
      return existing.filter(order =>
        order.userId === userIdOrEmail ||
        (order.address && order.address.email && order.address.email.toLowerCase() === target)
      );
    } catch {
      return [];
    }
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
    isOfflineMode,
    placeMockOrder,
    getMockOrders,
    getProductsData,
    API_URL
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
