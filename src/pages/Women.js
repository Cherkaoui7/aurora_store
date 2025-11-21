import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const womenProducts = [
  { id: 'w1', title: 'Summer Floral Dress', price: 75.00, rating: 5, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80' },
  { id: 'w2', title: 'High-Waist Jeans', price: 98.00, rating: 4, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80' },
  { id: 'w3', title: 'Silk Blouse', price: 110.00, rating: 5, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80' },
  { id: 'w4', title: 'Knit Cardigan', price: 65.00, rating: 4, image: 'https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?auto=format&fit=crop&w=800&q=80' },
  { id: 'w5', title: 'Midi Skirt', price: 55.00, rating: 4, image: 'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?auto=format&fit=crop&w=800&q=80' },
  { id: 'w6', title: 'Activewear Set', price: 80.00, rating: 5, image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=800&q=80' },
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