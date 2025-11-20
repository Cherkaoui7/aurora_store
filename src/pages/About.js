import React from 'react';
import styles from './PageStyles.module.css';

// Placeholder image for About page
const aboutImage = 'https://source.unsplash.com/random/800x600?team,office';

const About = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>About AURORA</h1>
      <div className={styles.aboutContent}>
        <img src={aboutImage} alt="Our Team" className={styles.aboutImage} />
        <div className={styles.aboutText}>
          <h2>Our Story</h2>
          <p>
            Founded in 2023, AURORA was born out of a desire to create essential pieces for the modern individual. We believe in style that is effortless, functional, and timeless.
          </p>
          <br />
          <p>
            Our mission is to design clothing and accessories that empower you to feel confident and comfortable in your everyday life, whether you're exploring the city or relaxing by the coast. We prioritize quality materials and sustainable practices in everything we do.
          </p>
           <br />
           <p>Welcome to the community.</p>
        </div>
      </div>
    </div>
  );
};

export default About;