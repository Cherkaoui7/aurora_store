import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const allProducts = [
  // Mix of Men, Women, Accessories
  { id: 1, title: 'Classic Cotton Tee', price: 35.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?tshirt' },
  { id: 2, title: 'Minimalist Backpack', price: 89.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?backpack' },
  { id: 3, title: 'Denim Jacket', price: 120.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?denim jacket' },
  { id: 4, title: 'Canvas Sneakers', price: 65.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?sneakers' },
  { id: 5, title: 'Summer Floral Dress', price: 75.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?dress' },
  { id: 6, title: 'Leather Crossbody Bag', price: 110.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?handbag' },
  { id: 7, title: 'Modern Sunglasses', price: 45.00, rating: 4, image: 'https://source.unsplash.com/random/300x400?sunglasses' },
  { id: 8, title: 'Chino Shorts', price: 55.00, rating: 5, image: 'https://source.unsplash.com/random/300x400?shorts' },
];

const ShopAll = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Shop All Products</h1>
      <div className={styles.productGrid}>
        {allProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ShopAll;