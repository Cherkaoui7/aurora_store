import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext'; // 1. Import it

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ShopContextProvider> {/* 2. Wrap App with it */}
      <App />
    </ShopContextProvider>
  </BrowserRouter>
);