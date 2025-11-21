import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Connect to Brain
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css'; // Reusing grid styles

const Men = () => {
  const { all_products } = useContext(ShopContext);

  // ✅ Filter only "Men" products from the Database
  const menProducts = all_products.filter(item => item.category === "Men");

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Men's Collection</h1>
      
      <div className={styles.productGrid}>
        {menProducts.length > 0 ? (
            menProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                id={product._id} // Pass the Database ID
                {...product} 
              />
            ))
        ) : (
            <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                No products found in this category.
            </p>
        )}
      </div>
    </div>
  );
};

export default Men;