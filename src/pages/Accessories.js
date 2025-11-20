import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const accessoryProducts = [
  { id: 'a1', title: 'Minimalist Backpack', price: 89.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?backpack' },
  { id: 'a2', title: 'Canvas Sneakers', price: 65.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?sneakers' },
  { id: 'a3', title: 'Leather Crossbody Bag', price: 110.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?leather bag' },
  { id: 'a4', title: 'Modern Sunglasses', price: 45.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?sunglasses' },
  { id: 'a5', title: 'Classic Watch', price: 150.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?watch' },
  { id: 'a6', title: 'Baseball Cap', price: 30.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?cap' },
];

const Accessories = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Accessories</h1>
      <div className={styles.productGrid}>
        {accessoryProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Accessories;