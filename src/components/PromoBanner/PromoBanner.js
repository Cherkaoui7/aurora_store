import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import navigation hook
import styles from './PromoBanner.module.css'; // Assuming you have this CSS
import { Reveal } from '../UI/Reveal'; // Import animation wrapper
import { motion } from 'framer-motion'; // For button hover effects

// If you have a local image, import it here. 
// Otherwise, ensure the CSS handles the background or image tag.
 

const PromoBanner = () => {
  // 2. Initialize Navigation
  const navigate = useNavigate();

  return (
    <section className={styles.bannerContainer}>
      
      {/* LEFT SIDE: IMAGE */}
      <div className={styles.imageWrapper}>
         {/* You can also animate the image sliding in from the left if you like */}
         <motion.img 
            src={"https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1600&q=80"} // Replace with your actual image source or variable
            alt="Essential Kit" 
            className={styles.bannerImage}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
         />
      </div>

      {/* RIGHT SIDE: CONTENT */}
      <div className={styles.contentWrapper}>
        
        <Reveal>
            <h2 className={styles.title}>The Essential Kit.</h2>
        </Reveal>
        
        <Reveal delay={0.2}>
            <h2 className={styles.title}>Buy 3, Save 20%.</h2>
        </Reveal>

        <Reveal delay={0.4}>
            <div className={styles.btnContainer}>
                <motion.button 
                    onClick={() => navigate('/shop')} // 3. Make it clickable!
                    className={styles.shopBtn}
                    whileHover={{ scale: 1.05, backgroundColor: "black", color: "white" }} // Cool invert effect
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    BUILD YOUR BUNDLE
                </motion.button>
            </div>
        </Reveal>

      </div>
    </section>
  );
};

export default PromoBanner;