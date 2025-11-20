import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarRating from '../UI/StarRating';
import styles from './ProductCard.module.css';

const ProductCard = ({ id, image, title, price, rating }) => {
  
  // Define our bouncy "spring" transition
  const springTransition = { type: "spring", stiffness: 350, damping: 25 };

  return (
    <Link to={`/product/${id}`} className={styles.cardLink}>
      <motion.div 
          className={styles.cardWrapper}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }} // Smooth entry
          whileHover={{ 
              y: -12, // Lift higher
              scale: 1.02, // Slight grow
              boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.15)" // Deep shadow on hover
          }}
          viewport={{ once: true, margin: "-50px" }}
      >
        <div className={styles.imageContainer}>
          <motion.img 
              src={image} 
              alt={title} 
              className={styles.image}
              whileHover={{ scale: 1.08 }} // Subtle zoom
              transition={springTransition}
          />
          
          {/* The new Floating Pill Button animating in */}
          <motion.div 
             className={styles.quickViewPill}
             initial={{ opacity: 0, y: 20, x: "-50%" }} // Start lower
             whileHover={{ opacity: 1, y: 0, x: "-50%" }} // Spring up to position
             transition={springTransition}
          >
            Quick View
          </motion.div>
        </div>
        
        <div className={styles.details}>
          <h3 className={styles.title}>{title}</h3>
          
          <div className={styles.ratingWrapper}>
             <StarRating rating={rating} />
          </div>

          <p className={styles.price}>${price.toFixed(2)}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;