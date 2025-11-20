import React from 'react';
import styles from './PageStyles.module.css'; // Reusing a shared CSS file for consistency
import { Reveal } from '../components/UI/Reveal';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className={styles.pageContainer}>
      
      <Reveal>
        <h1 className={styles.pageTitle}>About Us</h1>
      </Reveal>

      <div className={styles.aboutSection}>
        {/* Left Side: Image (Placeholder color for now) */}
        <div className={styles.aboutImage}></div>

        {/* Right Side: Text */}
        <div className={styles.aboutContent}>
            <Reveal delay={0.2}>
                <h2>Our Mission</h2>
                <p>
                    At AURORA, we believe that style should never compromise comfort. 
                    Born in 2025, our mission is to redefine modern essentials with 
                    breathable fabrics and timeless silhouettes.
                </p>
                <p>
                    We are not just a brand; we are a movement towards conscious 
                    consumption and quality craftsmanship.
                </p>
            </Reveal>

            {/* Stats Grid */}
            <Reveal delay={0.4}>
                <div className={styles.statsGrid}>
                    <div className={styles.statBox}>
                        <b>10k+</b>
                        <span>Happy Customers</span>
                    </div>
                    <div className={styles.statBox}>
                        <b>100%</b>
                        <span>Organic Cotton</span>
                    </div>
                    <div className={styles.statBox}>
                        <b>24/7</b>
                        <span>Support</span>
                    </div>
                </div>
            </Reveal>
        </div>
      </div>
      
      <Reveal delay={0.6}>
        <div className={styles.newsletterBox}>
            <h3>Join the Community</h3>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className={styles.inputRow}>
                <input type="email" placeholder="Enter your email" />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    SUBSCRIBE
                </motion.button>
            </div>
        </div>
      </Reveal>

    </div>
  );
};

export default About;