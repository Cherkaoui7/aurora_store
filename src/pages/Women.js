import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const Women = () => {
  const { all_products, search, setSearch } = useContext(ShopContext);

  const query = (search || '').trim().toLowerCase();

  // Filter "Women" products with safe query matching across name, subCategory, description
  const womenProducts = all_products.filter(item => {
    if (!item || item.category !== 'Women') return false;
    if (!query) return true;
    const name = (item.name || '').toLowerCase();
    const subCategory = (item.subCategory || '').toLowerCase();
    const description = (item.description || '').toLowerCase();
    return name.includes(query) || subCategory.includes(query) || description.includes(query);
  });

  const isSearching = Boolean(query);

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.shopHeader}>
        <h1 className={styles.pageTitle}>
          {isSearching ? `Women's Collection - "${search.trim()}"` : "Women's Collection"}
        </h1>
        {isSearching && (
          <button onClick={handleClearSearch} className={styles.clearSearchBtn}>
            Clear Search ✕
          </button>
        )}
      </div>

      <div className={styles.productGrid}>
        {womenProducts.length > 0 ? (
          womenProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.image}
              title={product.name}
              price={product.price}
              rating={4}
            />
          ))
        ) : (
          <div className={styles.noProductsContainer}>
            <p className={styles.noProductsText}>
              {isSearching
                ? `No products found in Women's Collection matching "${search}".`
                : "No products found in this category."}
            </p>
            {isSearching && (
              <button onClick={handleClearSearch} className={styles.resetBtn}>
                View All Women's Products
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Women;
