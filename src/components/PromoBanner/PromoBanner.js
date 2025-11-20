import React from 'react';
import styles from './PromoBanner.module.css';

// Placeholder image
const promoImage = 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1600&q=80';

const PromoBanner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.imageContainer}>
        <img src={promoImage} alt="The Essential Kit" className={styles.image} />
      </div>
      <div className={styles.content}>
        <h2>The Essential Kit.<br />Buy 3, Save 20%.</h2>
        <button className={styles.button}>BUILD YOUR BUNDLE</button>
      </div>
    </section>
  );
};

export default PromoBanner;