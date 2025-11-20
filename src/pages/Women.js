import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const womenProducts = [
  { id: 'w1', title: 'Summer Floral Dress', price: 75.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?womens dress' },
  { id: 'w2', title: 'High-Waist Jeans', price: 98.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?womens jeans' },
  { id: 'w3', title: 'Silk Blouse', price: 110.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?silk blouse' },
  { id: 'w4', title: 'Knit Cardigan', price: 65.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?cardigan' },
  { id: 'w5', title: 'Midi Skirt', price: 55.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?skirt' },
  { id: 'w6', title: 'Activewear Set', price: 80.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?activewear' },
];

const Women = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Women's Collection</h1>
      <div className={styles.productGrid}>
        {womenProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Women;