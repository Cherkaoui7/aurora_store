import React, { useState } from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Login from './pages/Login/Login'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('adminToken', newToken);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
  };

  // If no token, show login page
  if (!token) {
    return (
      <div>
        <ToastContainer />
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <div className="navbar">
        <h1 className="nav-logo">AURORA Admin</h1>
        <button onClick={handleLogout} style={{
          padding: '8px 18px', background: '#333', color: '#fff',
          border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
        }}>Logout</button>
      </div>
      <hr />
      <div className="app-content">
        <div className="sidebar">
          <NavLink to="/add" className="sidebar-option"><p>+ Add Items</p></NavLink>
          <NavLink to="/list" className="sidebar-option"><p>📋 List Items</p></NavLink>
          <NavLink to="/orders" className="sidebar-option"><p>📦 Orders</p></NavLink>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/list" replace />} />
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App