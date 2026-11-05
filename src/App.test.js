import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext';
import App from './App';

describe('Aurora Storefront App', () => {
  it('renders brand identity and main navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </MemoryRouter>
    );

    // Verify Brand Logo in Header & Footer
    const brandLogos = screen.getAllByText('AURORA');
    expect(brandLogos.length).toBeGreaterThan(0);

    // Verify Core Navigation Links exist across navigation areas (Header & Footer)
    expect(screen.getAllByRole('link', { name: /shop all/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /new arrivals/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /^men$/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /^women$/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /accessories/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThanOrEqual(1);
  });

  it('renders 404 page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-page-route']}>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
