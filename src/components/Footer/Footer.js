import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.newsletter}>
          <h3>Join the AURORA Community.<br />Get 10% off your first order.</h3>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Enter your email address" />
            <button>Sign Up</button>
          </div>
        </div>
        <div className={styles.links}>
          <h4>Shop</h4>
          <ul>
            {/* Update links */}
            <li><Link to="/shop">Shop All</Link></li>
            <li><Link to="/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>
          </ul>
        </div>
        <div className={styles.links}>
          <h4>Help</h4>
          <ul>
            {/* These can remain placeholder <a> tags or be routes if you create pages for them */}
            <li><a href="#help">Help</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#careers">Careers</a></li>
          </ul>
        </div>
        <div className={styles.links}>
          <h4>About</h4>
          <ul>
            {/* Update link */}
            <li><Link to="/about">About Us</Link></li>
            <li><a href="#story">Our Story</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className={styles.social}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <FiFacebook />
            <FiTwitter />
            <FiInstagram />
            <FiYoutube />
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContent}`}>
          <p>© 2023 AURORA.</p>
          <div className={styles.paymentIcons}>
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcAmex />
            <FaCcPaypal />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;