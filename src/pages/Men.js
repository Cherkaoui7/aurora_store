import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const menProducts = [
  { id: 'm1', title: 'Classic Cotton Tee', price: 35.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?mens t-shirt' },
  { id: 'm2', title: 'Denim Jacket', price: 120.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?mens denim jacket' },
  { id: 'm3', title: 'Slim Fit Chinos', price: 85.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?chinos' },
  { id: 'm4', title: 'Oxford Button-Down', price: 70.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?oxford shirt' },
  { id: 'm5', title: 'Casual Hoodie', price: 60.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?hoodie' },
  { id: 'm6', title: 'Swim Trunks', price: 45.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?swim trunks' },
];

const Men = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Men's Collection</h1>
      <div className={styles.productGrid}>
        {menProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Men;