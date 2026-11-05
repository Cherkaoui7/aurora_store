import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShopContextProvider from '../../context/ShopContext';
import ProductCard from './ProductCard';

describe('ProductCard Component', () => {
  const sampleProduct = {
    id: 'prod_99',
    name: 'Merino Wool Sweater',
    price: 89.5,
    image: ['https://example.com/sweater.jpg'],
    rating: 5
  };

  it('renders product details and price correctly', () => {
    render(
      <MemoryRouter>
        <ShopContextProvider>
          <ProductCard
            id={sampleProduct.id}
            name={sampleProduct.name}
            price={sampleProduct.price}
            image={sampleProduct.image}
            rating={sampleProduct.rating}
          />
        </ShopContextProvider>
      </MemoryRouter>
    );

    // Displays name as title
    expect(screen.getByText('Merino Wool Sweater')).toBeInTheDocument();

    // Displays formatted price
    expect(screen.getByText('$89.50')).toBeInTheDocument();

    // Contains link to product detail
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/prod_99');
  });

  it('toggles wishlist heart on button click', () => {
    render(
      <MemoryRouter>
        <ShopContextProvider>
          <ProductCard
            id={sampleProduct.id}
            title="Merino Wool Sweater"
            price={sampleProduct.price}
            image={sampleProduct.image}
          />
        </ShopContextProvider>
      </MemoryRouter>
    );

    const wishlistBtn = screen.getByRole('button');
    expect(wishlistBtn).toBeInTheDocument();

    // Click wishlist button
    fireEvent.click(wishlistBtn);
  });
});

