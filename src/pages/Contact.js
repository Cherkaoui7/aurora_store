import React from 'react';
import styles from './PageStyles.module.css'; // Make sure this matches the file name
import { Reveal } from '../components/UI/Reveal';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className={styles.pageContainer}>

      <Reveal>
        <h1 className={styles.pageTitle}>Contact Us</h1>
      </Reveal>

      <div className={styles.contactContainer}>

        {/* LEFT SIDE */}
        <div className={styles.contactInfo}>
          <Reveal delay={0.2}>
            <h3>Get in Touch</h3>
            <p>Our team is here to assist you with any questions.</p>

            <div className={styles.infoItem}>
              <b>Store Address</b>
              <p>123 Aurora Blvd, Casablanca, Morocco</p>
            </div>
            <div className={styles.infoItem}>
              <b>Email</b>
              <p>support@aurora.com</p>
            </div>
            <div className={styles.infoItem}>
              <b>Phone</b>
              <p>+212 600 000 000</p>
            </div>
          </Reveal>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className={styles.contactForm}>
          <Reveal delay={0.4}>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Your message has been received. We\'ll get back to you soon.'); e.target.reset(); }}>
              <label>Name</label>
              <input type="text" placeholder="Your Name" required />

              <label>Email</label>
              <input type="email" placeholder="Your Email" required />

              <label>Message</label>
              <textarea rows="5" placeholder="How can we help?" required></textarea>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.sendBtn}
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </Reveal>
        </div>

      </div>
    </div>
  );
};

export default Contact;