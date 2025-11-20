import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import FeaturesBanner from '../components/FeaturesBanner/FeaturesBanner';
import TrendingSection from '../components/TrendingSection/TrendingSection';
import CategorySection from '../components/CategorySection/CategorySection';
import PromoBanner from '../components/PromoBanner/PromoBanner';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesBanner />
      <TrendingSection />
      <CategorySection />
      <PromoBanner />
    </main>
  );
};

export default Home;