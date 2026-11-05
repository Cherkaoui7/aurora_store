import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React, { useContext } from 'react';
import ShopContextProvider, { ShopContext } from './ShopContext';

describe('ShopContext State Management', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }) => (
    <ShopContextProvider>{children}</ShopContextProvider>
  );

  it('manages cart items correctly with composite keys (id_size)', () => {
    const { result } = renderHook(() => useContext(ShopContext), { wrapper });

    expect(result.current.getTotalCartItems()).toBe(0);

    // Add item 1 with size M
    act(() => {
      result.current.addToCart('prod123', 'M');
    });

    expect(result.current.cartItems['prod123_M']).toBe(1);
    expect(result.current.getTotalCartItems()).toBe(1);

    // Add another of the same item and size
    act(() => {
      result.current.addToCart('prod123', 'M');
    });

    expect(result.current.cartItems['prod123_M']).toBe(2);
    expect(result.current.getTotalCartItems()).toBe(2);

    // Add same item with different size
    act(() => {
      result.current.addToCart('prod123', 'L');
    });

    expect(result.current.cartItems['prod123_L']).toBe(1);
    expect(result.current.getTotalCartItems()).toBe(3);

    // Decrement item
    act(() => {
      result.current.removeFromCart('prod123_M');
    });

    expect(result.current.cartItems['prod123_M']).toBe(1);
    expect(result.current.getTotalCartItems()).toBe(2);

    // Clear cart
    act(() => {
      result.current.clearCart();
    });

    expect(result.current.getTotalCartItems()).toBe(0);
    expect(Object.keys(result.current.cartItems).length).toBe(0);
  });

  it('toggles wishlist items state', () => {
    const { result } = renderHook(() => useContext(ShopContext), { wrapper });

    expect(result.current.wishlistItems['item1']).toBeFalsy();

    act(() => {
      result.current.toggleWishlist('item1');
    });

    expect(result.current.wishlistItems['item1']).toBe(true);

    act(() => {
      result.current.toggleWishlist('item1');
    });

    expect(result.current.wishlistItems['item1']).toBe(false);
  });

  it('handles customer login and logout with localStorage persistence', () => {
    const { result } = renderHook(() => useContext(ShopContext), { wrapper });

    expect(result.current.token).toBe('');
    expect(result.current.user).toBeNull();

    const mockUser = { id: 'user_1', name: 'Aurora Customer', email: 'customer@aurora.com' };
    const mockToken = 'mock_jwt_token_12345';

    act(() => {
      result.current.login(mockToken, mockUser);
    });

    expect(result.current.token).toBe(mockToken);
    expect(result.current.user).toEqual(mockUser);
    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(mockUser);

    act(() => {
      result.current.logout();
    });

    expect(result.current.token).toBe('');
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});

