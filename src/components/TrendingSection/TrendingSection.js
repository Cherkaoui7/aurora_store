import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './TrendingSection.module.css';

// Placeholder data
const products = [
  { id: 1, title: 'Classic Cotton Tee', price: 35.00, rating: 4, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Minimalist Backpack', price: 89.00, rating: 5, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Denim Jacket', price: 120.00, rating: 4, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Canvas Sneakers', price: 65.00, rating: 5, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80' },
];

const TrendingSection = () => {
  return (
    <section className={`container ${styles.section}`}>
      <h2 className={styles.heading}>Trending Right Now</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            id={product.id}       // 👈 THIS IS CRITICAL for the link to work
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;