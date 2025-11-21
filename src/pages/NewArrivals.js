import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Import the "Brain"
import ProductCard from '../components/ProductCard/ProductCard';
import styles from './PageStyles.module.css';

const NewArrivals = () => {
  const { all_products } = useContext(ShopContext);

  // 2. Filter the global list to find items marked as category 'New'
  const newArrivals = all_products.filter(item => item.category === 'New');

  // Override images for known new-arrival titles to ensure correct artwork
  const imageMap = {
    'Lightweight Linen Shirt': 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    'High-Waist Trousers': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
    'Woven Straw Hat': 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80',
    'Slip-on Loafers': 'https://images.unsplash.com/photo-1570464197285-9949814674a7?auto=format&fit=crop&w=800&q=80'
  };

  const newArrivalsWithImages = newArrivals.map(p => ({ ...p, image: imageMap[p.title] || p.image }));

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>New Arrivals</h1>
      <p style={{textAlign: 'center', marginBottom: '40px'}}>
        Explore our latest additions for the season.
      </p>
      
      <div className={styles.productGrid}>
        {newArrivalsWithImages.map((product) => (
          <ProductCard 
            key={product.id} 
            id={product.id} // Ensure ID is passed explicitly
            {...product} 
          />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;