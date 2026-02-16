import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import ProductCard from '../ProductCard/ProductCard';
import styles from './TrendingSection.module.css';

const TrendingSection = () => {
  const { all_products } = useContext(ShopContext);

  // Show up to 4 bestseller products, or the first 4 if none marked
  const trending = all_products.filter(p => p.bestseller).slice(0, 4);
  const displayProducts = trending.length > 0 ? trending : all_products.slice(0, 4);

  return (
    <section className={`container ${styles.section}`}>
      <h2 className={styles.heading}>Trending Right Now</h2>
      <div className={styles.grid}>
        {displayProducts.map((product) => (
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
    </section>
  );
};

export default TrendingSection;