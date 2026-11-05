import React from 'react';
import CategoryCard from '../CategoryCard/CategoryCard';
import styles from './CategorySection.module.css';

const categories = [
  {
    id: 1,
    title: "Men's Collection",
    link: '/men',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: "Women's Collection",
    link: '/women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: "Accessories",
    link: '/accessories',
    image: 'https://images.unsplash.com/photo-1512445239398-6d0c4c575b89?auto=format&fit=crop&w=800&q=80'
  },
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
