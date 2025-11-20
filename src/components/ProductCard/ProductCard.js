// src/components/ProductCard/ProductCard.js
import React from 'react';
import { FiStar } from 'react-icons/fi';
import styles from './ProductCard.module.css';

const ProductCard = ({ image, title, price, rating }) => {
  // Create an array of 5 stars for rendering
  const stars = Array(5).fill(0);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.quickView}>Quick View</div>
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.rating}>
          {/* We map over the array here */}
          {stars.map((_, index) => (
            <FiStar
              key={index}
              // If current index is less than rating, fill the star
              className={index < rating ? styles.starFilled : styles.starEmpty}
            />
          ))}
        </div>
        <p className={styles.price}>${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;