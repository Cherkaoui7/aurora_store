import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiX } from 'react-icons/fi'; // Import FiX (Close icon)
import { ShopContext } from '../../context/ShopContext';
import styles from './Header.module.css';

const Header = () => {
  // 1. Use Global Search State
  const { getTotalCartItems, search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const navigate = useNavigate();

  // 2. Handle Search Logic
  const handleSearch = (e) => {
     setSearch(e.target.value);
     // Optional: If you want to auto-redirect to shop while typing, uncomment below:
     // navigate('/shop');
  };

  const handleEnterKey = (e) => {
     if (e.key === 'Enter') {
         navigate('/shop'); // Go to shop page on Enter
         // Optional: setShowSearch(false); // Close bar after search?
     }
  };

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
          
          {/* SEARCH SECTION */}
          <div className={styles.searchWrapper}>
            <FiSearch 
              className={styles.icon} 
              onClick={() => setShowSearch(!showSearch)} 
              style={{ cursor: 'pointer' }}
            />
          </div>

          <Link to="/login"><FiUser className={styles.icon} /></Link>
          <Link to="/wishlist"><FiHeart className={styles.icon} /></Link>
          <Link to="/cart" className={styles.cartIconWrapper}>
            <FiShoppingCart className={styles.icon} />
            <span className={styles.cartCount}>{getTotalCartItems()}</span>
          </Link>
        </div>
      </div>

      {/* 3. THE SEARCH BAR (Full Width Dropdown) */}
      {showSearch && (
         <div className={styles.searchBarContainer}>
             <div className={styles.searchInputWrapper}>
                 <input 
                    type="text" 
                    placeholder="Search for products..." 
                    className={styles.realInput}
                    value={search}
                    onChange={handleSearch}
                    onKeyDown={handleEnterKey}
                    autoFocus
                 />
                 <FiSearch className={styles.searchIconInput} />
             </div>
             <FiX className={styles.closeSearch} onClick={() => setShowSearch(false)} />
         </div>
      )}
    </header>
  );
};

export default Header;