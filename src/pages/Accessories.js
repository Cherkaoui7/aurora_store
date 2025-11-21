import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // ✅ Import Context
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const Accessories = () => {
  // 1. Get all data from the "Brain"
  const { all_products } = useContext(ShopContext);

  // 2. Filter only Accessories
  const accessories = all_products.filter(item => item.category === "Accessories");

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Accessories</h1>
      
      <div className={styles.productGrid}>
        {accessories.length > 0 ? (
            accessories.map((product) => (
              <ProductCard 
                key={product._id} 
                id={product._id} // ✅ Pass the Database ID
                {...product} 
              />
            ))
        ) : (
            <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                No accessories found.
            </p>
        )}
      </div>
    </div>
  );
};

export default Accessories;