import React, { useState, useContext } from 'react'; // Import useContext
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { ShopContext } from '../../context/ShopContext'; // Import Context
import styles from './Header.module.css';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  
  // Get the total items count from context
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        Free Worldwide Shipping on orders over $100. | Easy Returns.
      </div>
      
      <div className={`container ${styles.navContainer}`}>
        <Link to="/" className={styles.logo}>AURORA</Link>
        
        <nav className={styles.nav}>
          <ul>
            <li><Link to="/shop">Shop All</Link></li>
            <li><Link to="/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>

        <div className={styles.icons}>
          <div className={styles.searchWrapper} style={{ position: 'relative', display: 'inline-block' }}>
            <FiSearch 
              className={styles.icon} 
              onClick={() => setShowSearch(!showSearch)} 
              style={{ cursor: 'pointer' }}
            />
            {showSearch && (
              <input 
                type="text" 
                placeholder="Search..." 
                className={styles.searchInput}
                autoFocus
              />
            )}
          </div>

          <Link to="/login">
            <FiUser className={styles.icon} />
          </Link>

          <Link to="/wishlist">
            <FiHeart className={styles.icon} />
          </Link>

          <Link to="/cart" className={styles.cartIconWrapper}>
            <FiShoppingCart className={styles.icon} />
            {/* DYNAMIC BADGE COUNT */}
            <span className={styles.cartCount}>{getTotalCartItems()}</span>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;