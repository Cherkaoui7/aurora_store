import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const NewArrivals = () => {
  const { all_products } = useContext(ShopContext);

  // Automatic Logic: Get last 10 items
  const newArrivals = all_products.slice(-10).reverse();

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>New Arrivals</h1>
      <p style={{textAlign: 'center', marginBottom: '40px'}}>
        Explore our latest additions for the season.
      </p>
      
      <div className={styles.productGrid}>
        {newArrivals.map((product) => (
          <ProductCard 
            key={product._id}      // ✅ Correct ID for React
            id={product._id}       // ✅ Correct ID for Link
            image={product.image}
            title={product.name}   // ✅ FIX: Map DB 'name' to Card 'title'
            price={product.price}
            rating={4}             // Default rating
          />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;