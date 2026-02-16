import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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
import Contact from './pages/Contact';

import Login from './pages/Login';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Product from './pages/Product';
import PlaceOrder from './pages/PlaceOrder';

const NotFound = () => (
  <div style={{ textAlign: 'center', padding: '100px 20px' }}>
    <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
    <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>Page not found</p>
    <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>Go back home</Link>
  </div>
);

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
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;