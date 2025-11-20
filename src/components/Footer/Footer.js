import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { Reveal } from '../UI/Reveal'; // Import your animation wrapper
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* COLUMN 1: BRAND & INFO */}
        <div className={styles.column}>
            <Reveal>
                <h2 className={styles.logo}>AURORA</h2>
                <p className={styles.text}>
                    Elevating your everyday style with breathable fabrics and timeless designs. 
                    Quality you can feel, aesthetics you can wear.
                </p>
                <div className={styles.socials}>
                    <div className={styles.socialIcon}><FaInstagram /></div>
                    <div className={styles.socialIcon}><FaFacebookF /></div>
                    <div className={styles.socialIcon}><FaTwitter /></div>
                    <div className={styles.socialIcon}><FaLinkedinIn /></div>
                </div>
            </Reveal>
        </div>

        {/* COLUMN 2: SHOP LINKS */}
        <div className={styles.column}>
            <Reveal delay={0.1}>
                <h3 className={styles.heading}>SHOP</h3>
                <ul className={styles.links}>
                    <li><Link to="/men">Men</Link></li>
                    <li><Link to="/women">Women</Link></li>
                    <li><Link to="/accessories">Accessories</Link></li>
                    <li><Link to="/new-arrivals">New Arrivals</Link></li>
                </ul>
            </Reveal>
        </div>

        {/* COLUMN 3: COMPANY */}
        <div className={styles.column}>
             <Reveal delay={0.2}>
                <h3 className={styles.heading}>COMPANY</h3>
                <ul className={styles.links}>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/careers">Careers</Link></li>
                    <li><Link to="/privacy">Privacy Policy</Link></li>
                </ul>
            </Reveal>
        </div>

        {/* COLUMN 4: NEWSLETTER */}
        <div className={styles.column}>
            <Reveal delay={0.3}>
                <h3 className={styles.heading}>STAY IN THE LOOP</h3>
                <p className={styles.text}>Sign up for exclusive offers and style tips.</p>
                <div className={styles.inputGroup}>
                    <input type="email" placeholder="Enter your email" />
                    <button>SUBSCRIBE</button>
                </div>
            </Reveal>
        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className={styles.copyright}>
         <p>© 2025 AURORA. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;