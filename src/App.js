import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Pages
import Home from './pages/Home';
import ShopAll from './pages/ShopAll';
import NewArrivals from './pages/NewArrivals';
import Men from './pages/Men';
import Women from './pages/Women';
import Accessories from './pages/Accessories';
import About from './pages/About';
import Contact from './pages/Contact'; // ✅ NEW: Import Contact

import Login from './pages/Login';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Product from './pages/Product';
import PlaceOrder from './pages/PlaceOrder';

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopAll />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/about" element={<About />} />
          
          {/* ✅ NEW: Add this Route line */}
          <Route path="/contact" element={<Contact />} />

          <Route path="/product/:productId" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/place-order" element={<PlaceOrder />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;