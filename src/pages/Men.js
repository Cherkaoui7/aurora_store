import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const menProducts = [
  { id: 'm1', title: 'Classic Cotton Tee', price: 35.00, rating: 4, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80' },
  { id: 'm2', title: 'Denim Jacket', price: 120.00, rating: 5, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80' },
  { id: 'm3', title: 'Slim Fit Chinos', price: 85.00, rating: 4, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80' },
  { id: 'm4', title: 'Oxford Button-Down', price: 70.00, rating: 5, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80' },
  { id: 'm5', title: 'Casual Hoodie', price: 60.00, rating: 4, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80' },
  { id: 'm6', title: 'Swim Trunks', price: 45.00, rating: 5, image: 'https://imgs.search.brave.com/Vena2AY99VsURuVEoitjAlUQ-KUO13_cdxFmdyLJF88/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzgxcThsOTE4MnJM/LmpwZw' },
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