import React from 'react';
import styles from './HeroSection.module.css';

// Placeholder image. Replace with your own.
const heroImage = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const HeroSection = () => {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${heroImage})` }}>
      <div className={`container ${styles.content}`}>
        <h1>The Summer <br />Collection is Here.</h1>
        <p>Discover breathable fabrics and effortless styles designed for the sun.</p>
        <button className={styles.button}>SHOP THE COLLECTION</button>
      </div>
    </section>
  );
};

export default HeroSection;