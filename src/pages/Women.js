import React, { useContext } from 'react'; // ✅ Added useContext
import { ShopContext } from '../context/ShopContext'; // ✅ Added ShopContext
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const Women = () => {
  const { all_products } = useContext(ShopContext);

  // Filter only "Women" products from the Database
  const womenProducts = all_products.filter(item => item.category === "Women");

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Women's Collection</h1>
      
      <div className={styles.productGrid}>
        {womenProducts.length > 0 ? (
            womenProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                id={product._id} 
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

export default Women;