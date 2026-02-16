import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/admin/login`, { email, password });
            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                onLogin(response.data.token);
                toast.success('Logged in successfully');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            minHeight: '100vh', background: '#f5f5f5'
        }}>
            <form onSubmit={handleSubmit} style={{
                background: 'white', padding: '40px', borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '100%', maxWidth: '400px'
            }}>
                <h2 style={{ marginBottom: '24px', textAlign: 'center', fontFamily: 'inherit' }}>
                    AURORA Admin
                </h2>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#555' }}>Email</label>
                    <input
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@aurora.com" required
                        style={{
                            width: '100%', padding: '10px 12px', border: '1px solid #ddd',
                            borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#555' }}>Password</label>
                    <input
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password" required
                        style={{
                            width: '100%', padding: '10px 12px', border: '1px solid #ddd',
                            borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box'
                        }}
                    />
                </div>
                <button type="submit" style={{
                    width: '100%', padding: '12px', background: '#000', color: '#fff',
                    border: 'none', borderRadius: '6px', fontSize: '15px', cursor: 'pointer',
                    fontWeight: '600'
                }}>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;
