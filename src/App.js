import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import all page components
import Home from './pages/Home';
import ShopAll from './pages/ShopAll';
import NewArrivals from './pages/NewArrivals';
import Men from './pages/Men';
import Women from './pages/Women';
import Accessories from './pages/Accessories';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
          <Routes>
            {/* Define routes for each page */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopAll />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/about" element={<About />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;