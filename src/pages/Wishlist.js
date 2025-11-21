import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css'; // Reusing your grid styles

const Wishlist = () => {
  const { all_products, wishlistItems } = useContext(ShopContext);

  // Filter products that are marked True in wishlistItems
  const savedProducts = all_products.filter((item) => wishlistItems[item.id]);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>My Wishlist</h1>

      {savedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
          <p>You haven't saved any items yet.</p>
        </div>
      ) : (
        <div className={styles.productGrid}>
          {savedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              id={product.id}
              {...product} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;