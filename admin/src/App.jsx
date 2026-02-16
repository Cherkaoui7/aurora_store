import React from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <div className="navbar">
        <h1 className="nav-logo">AURORA Admin</h1>
        <div className="nav-profile"></div>
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
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App