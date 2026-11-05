import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ title, image, link = '/shop' }) => {
  return (
    <Link to={link} className={styles.card} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.overlay}></div>
      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
};

export default CategoryCard;
