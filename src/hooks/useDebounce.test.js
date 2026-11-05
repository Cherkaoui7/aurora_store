import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounce';

describe('useDebounce Custom Hook', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('returns the initial value immediately on render', () => {
        const { result } = renderHook(() => useDebounce('initial', 150));
        expect(result.current).toBe('initial');
    });

    it('debounces rapid value updates by specified delay', () => {
        let currentVal = 'first';
        const { result, rerender } = renderHook(({ val }) => useDebounce(val, 150), {
            initialProps: { val: currentVal }
        });

        expect(result.current).toBe('first');

        // Update value
        rerender({ val: 'second' });
        expect(result.current).toBe('first'); // Not yet updated

        // Advance timers by 100ms (less than 150ms delay)
        act(() => {
            vi.advanceTimersByTime(100);
        });
        expect(result.current).toBe('first');

        // Advance remaining 50ms
        act(() => {
            vi.advanceTimersByTime(50);
        });
        expect(result.current).toBe('second');
    });
});

