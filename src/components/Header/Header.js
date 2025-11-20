import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        Free Worldwide Shipping on orders over $100. | Easy Returns.
      </div>
      <div className={`container ${styles.navContainer}`}>
        {/* Use Link for logo */}
        <Link to="/" className={styles.logo}>AURORA</Link>
        <nav className={styles.nav}>
          <ul>
            {/* Use Link for navigation items */}
            <li><Link to="/shop">Shop All</Link></li>
            <li><Link to="/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <div className={styles.icons}>
          <FiSearch className={styles.icon} />
          <FiUser className={styles.icon} />
          <FiHeart className={styles.icon} />
          <div className={styles.cartIconWrapper}>
            <FiShoppingCart className={styles.icon} />
            <span className={styles.cartCount}>3</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;