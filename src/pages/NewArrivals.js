import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Import the "Brain"
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const NewArrivals = () => {
  const { all_products } = useContext(ShopContext);

  // 2. Filter the global list to find items marked as category 'New'
  const newArrivals = all_products.filter(item => item.category === 'New');

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>New Arrivals</h1>
      <p style={{textAlign: 'center', marginBottom: '40px'}}>
        Explore our latest additions for the season.
      </p>
      
      <div className={styles.productGrid}>
        {newArrivals.map((product) => (
          <ProductCard 
            key={product.id} 
            id={product.id} // Ensure ID is passed explicitly
            {...product} 
          />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;