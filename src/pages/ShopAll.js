import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard/ProductCard';
import useDebounce from '../hooks/useDebounce';
import styles from './PageStyles.module.css';

const ShopAll = () => {
  const { all_products, search, setSearch } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const debouncedSearch = useDebounce(search, 150);

  useEffect(() => {
    const query = (debouncedSearch || '').trim().toLowerCase();
    if (!query) {
      setFilteredProducts(all_products);
    } else {
      const filtered = all_products.filter(item => {
        if (!item) return false;
        const name = (item.name || '').toLowerCase();
        const category = (item.category || '').toLowerCase();
        const subCategory = (item.subCategory || '').toLowerCase();
        const description = (item.description || '').toLowerCase();

        return (
          name.includes(query) ||
          category.includes(query) ||
          subCategory.includes(query) ||
          description.includes(query)
        );
      });
      setFilteredProducts(filtered);
    }
  }, [debouncedSearch, all_products]);

  const handleClearSearch = () => {
    setSearch('');
  };

  const isSearching = Boolean((search || '').trim());

  return (
    <div className={styles.pageContainer}>
      <div className={styles.shopHeader}>
        <h1 className={styles.pageTitle}>
          {isSearching ? `Results for "${search.trim()}"` : 'Shop All Products'}
        </h1>
        {isSearching && (
          <button onClick={handleClearSearch} className={styles.clearSearchBtn}>
            Clear Search ✕
          </button>
        )}
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
              No products found matching &ldquo;{search}&rdquo;.
            </p>
            <p className={styles.noProductsSubtext}>
              Try checking your spelling or searching for another term (e.g. jacket, cotton, accessories).
            </p>
            <button onClick={handleClearSearch} className={styles.resetBtn}>
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopAll;
