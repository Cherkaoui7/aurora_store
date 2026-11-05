import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import styles from './Login.module.css';

const Login = () => {
  const { token, user, login, logout, API_URL } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Fetch orders when user is logged in
  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!token) return;
      try {
        setLoadingOrders(true);
        const response = await axios.get(`${API_URL}/api/order/userorders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setUserOrders(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch user orders:", err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchUserOrders();
  }, [token, API_URL]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${API_URL}/api/user/register`, {
          name,
          email,
          password
        });

        if (response.data.success) {
          login(response.data.token, response.data.user);
          setName('');
          setEmail('');
          setPassword('');
        } else {
          setError(response.data.message || 'Registration failed');
        }
      } else {
        const response = await axios.post(`${API_URL}/api/user/login`, {
          email,
          password
        });

        if (response.data.success) {
          login(response.data.token, response.data.user);
          setEmail('');
          setPassword('');
        } else {
          setError(response.data.message || 'Login failed');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If already logged in, show User Profile & Order History
  if (token && user) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div>
              <h2 className={styles.userName}>Hello, {user.name} 👋</h2>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
            <button onClick={logout} className={styles.logoutBtn}>
              Sign Out
            </button>
          </div>

          <div className={styles.ordersSection}>
            <h3 className={styles.ordersTitle}>Your Orders</h3>
            {loadingOrders ? (
              <p className={styles.noOrders}>Loading your orders...</p>
            ) : userOrders.length === 0 ? (
              <p className={styles.noOrders}>You haven't placed any orders yet.</p>
            ) : (
              <div>
                {userOrders.map((order) => (
                  <div key={order._id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <span>Order #{order._id.slice(-6).toUpperCase()}</span>
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                      <span className={styles.orderStatus}>{order.status}</span>
                    </div>
                    <div className={styles.orderItems}>
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.name} ({item.size || 'Standard'}) x {item.quantity}
                        </div>
                      ))}
                    </div>
                    <div className={styles.orderTotal}>
                      Total: ${Number(order.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Not logged in: Show Form
  return (
    <div className={styles.loginContainer}>
      <form onSubmit={onSubmitHandler} className={styles.loginForm}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{currentState}</h1>
          <div className={styles.underline}></div>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        {currentState === 'Sign Up' && (
          <input
            type="text"
            className={styles.inputField}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          className={styles.inputField}
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className={styles.inputField}
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className={styles.forgotPassword}>
          {currentState === 'Login' ? (
            <>
              <p>Don't have an account?</p>
              <p onClick={() => { setCurrentState('Sign Up'); setError(''); }} className={styles.toggleText}>
                Create account
              </p>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <p onClick={() => { setCurrentState('Login'); setError(''); }} className={styles.toggleText}>
                Sign in here
              </p>
            </>
          )}
        </div>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Please wait...' : (currentState === 'Sign Up' ? 'Create Account' : 'Sign In')}
        </button>
      </form>
    </div>
  );
};

export default Login;
