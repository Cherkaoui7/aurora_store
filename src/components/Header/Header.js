import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiX} from 'react-icons/fi';
import { ShopContext } from '../../context/ShopContext';
import styles from './Header.module.css';

const Header = () => {
  const { getTotalCartItems, search, setSearch, showSearch, setShowSearch, user } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
     setSearch(e.target.value);
  };

  const handleEnterKey = (e) => {
     if (e.key === 'Enter') {
         navigate('/shop');
     }
  };

  const handleSearchClick = () => {
     navigate('/shop');
  };

  const handleCloseSearch = () => {
     setShowSearch(false);
     setSearch('');
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        Free Worldwide Shipping on orders over $100. | Easy Returns.
      </div>
      
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo}>AURORA</Link>
        </div>
        
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
          
          {/* SEARCH TRIGGER */}
          <div className={styles.searchWrapper}>
            <FiSearch 
              className={styles.icon} 
              onClick={() => setShowSearch(!showSearch)} 
              style={{ cursor: 'pointer' }}
              title={showSearch ? "Close search bar" : "Open search bar"}
            />
          </div>

          <Link
            to="/login"
            className={styles.userIconWrapper}
            title={user ? `Signed in as ${user.name}` : "Sign In"}
          >
            <FiUser className={styles.icon} />
            {user && <span className={styles.userBadge} />}
          </Link>
          <Link to="/wishlist"><FiHeart className={styles.icon} /></Link>
          <Link to="/cart" className={styles.cartIconWrapper}>
            <FiShoppingCart className={styles.icon} />
            <span className={styles.cartCount}>{getTotalCartItems()}</span>
          </Link>
        </div>
      </div>

      {/* SEARCH BAR (Full Width Dropdown) */}
      {showSearch && (
         <div className={styles.searchBarContainer}>
             <div className={styles.searchInputWrapper}>
                 <input 
                    type="text" 
                    placeholder="Search products by name, category, or description..." 
                    className={styles.realInput}
                    value={search}
                    onChange={handleSearch}
                    onKeyDown={handleEnterKey}
                    maxLength={100}
                    autoFocus
                 />
                 <FiSearch 
                    className={styles.searchIconInput} 
                    onClick={handleSearchClick}
                    title="Click to search"
                 />
             </div>
             <FiX 
                className={styles.closeSearch} 
                onClick={handleCloseSearch} 
                title="Close and clear search"
             />
         </div>
      )}
    </header>
  );
};

export default Header;
