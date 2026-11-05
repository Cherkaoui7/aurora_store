import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ShopAll from './ShopAll';
import { ShopContext } from '../context/ShopContext';

describe('ShopAll Search Integration', () => {
  const mockProducts = [
    {
      _id: '1',
      name: 'Classic Wool Trench Coat',
      category: 'Men',
      subCategory: 'Jackets',
      description: 'Warm winter trench coat crafted from 100% pure wool.',
      price: 250,
      image: ['https://example.com/coat.jpg']
    },
    {
      _id: '2',
      name: 'Silk Slip Dress',
      category: 'Women',
      subCategory: 'Dresses',
      description: 'Elegant evening slip dress made of pure mulberry silk.',
      price: 180,
      image: ['https://example.com/dress.jpg']
    },
    {
      _id: '3',
      name: 'Leather Minimalist Belt',
      category: 'Accessories',
      subCategory: 'Belts',
      description: 'Handcrafted Italian full-grain leather belt.',
      price: 65,
      image: ['https://example.com/belt.jpg']
    },
    {
      // Edge case: missing name or description
      _id: '4',
      name: null,
      category: 'Unisex',
      subCategory: null,
      description: null,
      price: 40,
      image: ['https://example.com/unnamed.jpg']
    }
  ];

  it('renders all products when search is empty', () => {
    const contextValue = {
      all_products: mockProducts,
      search: '',
      setSearch: vi.fn()
    };

    render(
      <MemoryRouter>
        <ShopContext.Provider value={contextValue}>
          <ShopAll />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Shop All Products')).toBeInTheDocument();
    expect(screen.getByText('Classic Wool Trench Coat')).toBeInTheDocument();
    expect(screen.getByText('Silk Slip Dress')).toBeInTheDocument();
    expect(screen.getByText('Leather Minimalist Belt')).toBeInTheDocument();
  });

  it('filters products safely across description keywords without crashing on null properties', () => {
    const contextValue = {
      all_products: mockProducts,
      search: 'mulberry',
      setSearch: vi.fn()
    };

    render(
      <MemoryRouter>
        <ShopContext.Provider value={contextValue}>
          <ShopAll />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Results for "mulberry"')).toBeInTheDocument();
    expect(screen.getByText('Silk Slip Dress')).toBeInTheDocument();
    expect(screen.queryByText('Classic Wool Trench Coat')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear search/i })).toBeInTheDocument();
  });

  it('renders empty state when no products match, and clicking clear invokes setSearch("")', () => {
    const setSearchMock = vi.fn();
    const contextValue = {
      all_products: mockProducts,
      search: 'nonexistent-query-xyz',
      setSearch: setSearchMock
    };

    render(
      <MemoryRouter>
        <ShopContext.Provider value={contextValue}>
          <ShopAll />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/no products found matching/i)).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /view all products/i });
    expect(resetBtn).toBeInTheDocument();
    fireEvent.click(resetBtn);

    expect(setSearchMock).toHaveBeenCalledWith('');
  });
});

