import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const ShopAll = () => {
  const { all_products, search } = useContext(ShopContext); // Get search term
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter Logic
  useEffect(() => {
    if (search === '') {
        setFilteredProducts(all_products);
    } else {
        const filtered = all_products.filter(item => 
            item.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filtered);
    }
  }, [search, all_products]);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>
          {search ? `Results for "${search}"` : 'Shop All Products'}
      </h1>
      
      <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id} 
                {...product} 
              />
            ))
        ) : (
            <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ShopAll;