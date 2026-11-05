import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiX, FiMenu } from 'react-icons/fi';
import { ShopContext } from '../../context/ShopContext';
import styles from './Header.module.css';

const Header = () => {
  const { getTotalCartItems, search, setSearch, showSearch, setShowSearch, user } = useContext(ShopContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setShowSearch(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setShowSearch]);

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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        Free Worldwide Shipping on orders over $100. | Easy Returns.
      </div>
      
      <div className={`container ${styles.navContainer}`}>
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX className={styles.toggleIcon} /> : <FiMenu className={styles.toggleIcon} />}
        </button>

        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>AURORA</Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Main Navigation">
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
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setShowSearch(!showSearch)}
              aria-label={showSearch ? "Close search bar" : "Open search bar"}
              title={showSearch ? "Close search bar" : "Open search bar"}
            >
              <FiSearch className={styles.icon} />
            </button>
          </div>

          <Link
            to="/login"
            className={`${styles.userIconWrapper} ${styles.iconButton}`}
            title={user ? `Signed in as ${user.name}` : "Sign In"}
            aria-label={user ? `Signed in as ${user.name}` : "Sign In"}
            onClick={closeMenu}
          >
            <FiUser className={styles.icon} />
            {user && <span className={styles.userBadge} />}
          </Link>
          <Link
            to="/wishlist"
            className={styles.iconButton}
            aria-label="Wishlist"
            onClick={closeMenu}
          >
            <FiHeart className={styles.icon} />
          </Link>
          <Link
            to="/cart"
            className={`${styles.cartIconWrapper} ${styles.iconButton}`}
            aria-label={`Cart with ${getTotalCartItems()} items`}
            onClick={closeMenu}
          >
            <FiShoppingCart className={styles.icon} />
            <span className={styles.cartCount}>{getTotalCartItems()}</span>
          </Link>
        </div>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {isMenuOpen && (
        <>
          <div className={styles.mobileBackdrop} onClick={closeMenu} />
          <nav className={styles.mobileNav} aria-label="Mobile Navigation">
            <ul className={styles.mobileNavList}>
              <li><Link to="/shop" onClick={closeMenu}>Shop All</Link></li>
              <li><Link to="/new-arrivals" onClick={closeMenu}>New Arrivals</Link></li>
              <li><Link to="/men" onClick={closeMenu}>Men</Link></li>
              <li><Link to="/women" onClick={closeMenu}>Women</Link></li>
              <li><Link to="/accessories" onClick={closeMenu}>Accessories</Link></li>
              <li><Link to="/about" onClick={closeMenu}>About</Link></li>
              <li className={styles.mobileNavDivider} />
              <li>
                <Link to="/login" onClick={closeMenu} className={styles.mobileAuthLink}>
                  <FiUser className={styles.mobileLinkIcon} />
                  {user ? `Account (${user.name})` : 'Sign In / Register'}
                </Link>
              </li>
              <li>
                <Link to="/wishlist" onClick={closeMenu} className={styles.mobileAuthLink}>
                  <FiHeart className={styles.mobileLinkIcon} />
                  Wishlist
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}

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
            <button
              type="button"
              className={styles.searchSubmitBtn}
              onClick={handleSearchClick}
              aria-label="Search"
              title="Click to search"
            >
              <FiSearch className={styles.searchIconInput} />
            </button>
          </div>
          <button
            type="button"
            className={styles.closeSearchBtn}
            onClick={handleCloseSearch}
            aria-label="Close and clear search"
            title="Close and clear search"
          >
            <FiX className={styles.closeSearch} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
