import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Import the "Brain"
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const ShopAll = () => {
  // 1. Get the data from the Global Context instead of a local array
  const { all_products } = useContext(ShopContext);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Shop All Products</h1>
      <div className={styles.productGrid}>
        {all_products.map((product) => (
          <ProductCard 
            key={product.id} 
            id={product.id} // Ensure ID is passed explicitly
            {...product}    // Spread the rest (image, title, price, rating)
          />
        ))}
      </div>
    </div>
  );
};

export default ShopAll;