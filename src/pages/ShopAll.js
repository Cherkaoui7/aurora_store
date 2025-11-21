import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const ShopAll = () => {
  const { all_products, search } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (search === '') {
        setFilteredProducts(all_products);
    } else {
        const filtered = all_products.filter(item => 
            item.name.toLowerCase().includes(search.toLowerCase()) // changed item.title to item.name
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
                key={product._id}      // ✅ FIX 1: Use _id for React Key
                id={product._id}       // ✅ FIX 2: Pass _id as the id prop
                image={product.image}
                title={product.name}   // ✅ FIX 3: Map DB 'name' to Card 'title'
                price={product.price}
                rating={4}             // Default rating until DB has one
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