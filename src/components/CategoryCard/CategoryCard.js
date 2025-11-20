import React from 'react';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ title, image }) => {
  return (
    <div className={styles.card} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.overlay}></div>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};

export default CategoryCard;