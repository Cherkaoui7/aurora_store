import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const accessoryProducts = [
  { id: 'a1', title: 'Minimalist Backpack', price: 89.00, rating: 5, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
  { id: 'a2', title: 'Canvas Sneakers', price: 65.00, rating: 4, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80' },
  { id: 'a3', title: 'Leather Crossbody Bag', price: 110.00, rating: 5, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80' },
  { id: 'a4', title: 'Modern Sunglasses', price: 45.00, rating: 4, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80' },
  { id: 'a5', title: 'Classic Watch', price: 150.00, rating: 5, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80' },
  { id: 'a6', title: 'Baseball Cap', price: 30.00, rating: 4, image: 'https://images.unsplash.com/photo-1595642527925-4d41cb781653?auto=format&fit=crop&w=800&q=80' },
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