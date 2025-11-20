import React from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import styles from './CategorySection.module.css';

// Placeholder data
const categories = [
  { id: 1, title: 'Footwear', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Accessories', image: 'https://images.unsplash.com/photo-1512445239398-6d0c4c575b89?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Outerwear', image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=80' },
];

const CategorySection = () => {
  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.grid}>
        {categories.map(category => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;