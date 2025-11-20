import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import the navigation hook
import styles from './HeroSection.module.css';
import { Reveal } from '../UI/Reveal'; 
import { motion } from 'framer-motion';

const HeroSection = () => {
  // 2. Initialize the hook
  const navigate = useNavigate();

  // 3. Create the function to handle the click
  const handleShopNow = () => {
    navigate('/shop'); // Redirects user to the /shop page
    // navigate('/new-arrivals'); // Or change to this if you prefer
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        
        {/* Title */}
        <Reveal width="100%">
            <h1 className={styles.title}>The Summer <br /> Collection is Here.</h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal width="100%" delay={0.2}>
            <p className={styles.subtitle}>
                Discover breathable fabrics and effortless styles designed for the sun.
            </p>
        </Reveal>

        {/* Button - Now Functional! */}
        <Reveal width="100%" delay={0.4}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <motion.button 
                    onClick={handleShopNow} // 4. Attach the click handler here
                    className={styles.ctaButton}
                    whileHover={{ scale: 1.05, backgroundColor: "#f8f8f8" }} // Added subtle color change on hover
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    SHOP THE COLLECTION
                </motion.button>
            </div>
        </Reveal>

      </div>
    </section>
  );
};

export default HeroSection;