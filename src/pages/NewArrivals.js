import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const newProducts = [
  { id: 101, title: 'Lightweight Linen Shirt', price: 68.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?linen shirt' },
  { id: 102, title: 'High-Waist Trousers', price: 95.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?trousers' },
  { id: 103, title: 'Woven Straw Hat', price: 42.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?straw hat' },
  { id: 104, title: 'Slip-on Loafers', price: 115.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?loafers' },
];

const NewArrivals = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>New Arrivals</h1>
      <p style={{textAlign: 'center', marginBottom: '40px'}}>Explore our latest additions for the season.</p>
      <div className={styles.productGrid}>
        {newProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;