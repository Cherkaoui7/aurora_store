import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const Wishlist = () => {
  const { all_products, wishlistItems } = useContext(ShopContext);

  // Filter products that are marked True in wishlistItems
  const savedProducts = all_products.filter((item) => wishlistItems[item._id]);

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
              key={product._id}
              id={product._id}
              image={product.image}
              title={product.name}
              price={product.price}
              rating={4}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;