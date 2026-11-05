import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import styles from './Login.module.css';

const Login = () => {
  const { token, user, login, logout, API_URL, getMockOrders } = useContext(ShopContext);

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
          headers: { Authorization: `Bearer ${token}` },
          timeout: 3000
        });
        if (response?.data?.success && Array.isArray(response.data.data)) {
          setUserOrders(response.data.data);
          return;
        }
      } catch (err) {
        // Fall back to localStorage simulated orders
        console.info("[AURORA Offline Simulation] Chargement des commandes depuis le LocalStorage.");
      } finally {
        // If no server orders, load from LocalStorage
        const local = getMockOrders ? getMockOrders(user?.id || user?.email) : [];
        if (local && local.length > 0) {
          setUserOrders(prev => (prev && prev.length > 0 ? prev : local));
        }
        setLoadingOrders(false);
      }
    };

    fetchUserOrders();
  }, [token, API_URL, user, getMockOrders]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    try {
      if (currentState === 'Sign Up') {
        try {
          const response = await axios.post(`${API_URL}/api/user/register`, {
            name: name.trim(),
            email: normalizedEmail,
            password
          }, { timeout: 3500 });

          if (response?.data?.success) {
            login(response.data.token, response.data.user);
            setName('');
            setEmail('');
            setPassword('');
            setLoading(false);
            return;
          }
        } catch (apiErr) {
          // Graceful fallback to offline localStorage registration
          console.info("[AURORA Offline Simulation] Backend indisponible. Simulation d'inscription locale.");
          const mockUsers = JSON.parse(localStorage.getItem('aurora_mock_users') || '[]');
          const existing = mockUsers.find(u => u.email.toLowerCase() === normalizedEmail);
          if (existing) {
            setError('Cet email est déjà utilisé (Simulation locale).');
            setLoading(false);
            return;
          }

          const newUser = {
            id: 'usr_' + Date.now(),
            name: name.trim() || 'Client Aurora',
            email: normalizedEmail
          };
          mockUsers.push({ ...newUser, password });
          localStorage.setItem('aurora_mock_users', JSON.stringify(mockUsers));

          const mockToken = 'mock_jwt_' + btoa(normalizedEmail) + '_' + Date.now();
          login(mockToken, newUser);
          setName('');
          setEmail('');
          setPassword('');
          setLoading(false);
          return;
        }
      } else {
        // Login Flow
        try {
          const response = await axios.post(`${API_URL}/api/user/login`, {
            email: normalizedEmail,
            password
          }, { timeout: 3500 });

          if (response?.data?.success) {
            login(response.data.token, response.data.user);
            setEmail('');
            setPassword('');
            setLoading(false);
            return;
          }
        } catch (apiErr) {
          // Graceful fallback to offline localStorage login
          console.info("[AURORA Offline Simulation] Backend indisponible. Simulation de connexion locale.");
          const mockUsers = JSON.parse(localStorage.getItem('aurora_mock_users') || '[]');
          const found = mockUsers.find(u => u.email.toLowerCase() === normalizedEmail);

          const authenticatedUser = found ? {
            id: found.id,
            name: found.name,
            email: found.email
          } : {
            id: 'usr_' + Date.now(),
            name: normalizedEmail.split('@')[0],
            email: normalizedEmail
          };

          const mockToken = 'mock_jwt_' + btoa(normalizedEmail) + '_' + Date.now();
          login(mockToken, authenticatedUser);
          setEmail('');
          setPassword('');
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur inattendue. Veuillez réessayer.');
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
                      <span>Order #{String(order._id).slice(-6).toUpperCase()}</span>
                      <span>{new Date(order.date || Date.now()).toLocaleDateString()}</span>
                      <span className={styles.orderStatus}>{order.status}</span>
                    </div>
                    <div className={styles.orderItems}>
                      {order.items?.map((item, index) => (
                        <div key={index}>
                          {item.name || item.title} ({item.size || 'Standard'}) x {item.quantity}
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
