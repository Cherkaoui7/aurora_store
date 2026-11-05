import '@testing-library/jest-dom/vitest';

// Mock IntersectionObserver for Framer Motion viewport / useInView features
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = MockIntersectionObserver;
window.IntersectionObserver = MockIntersectionObserver;
window.scrollTo = () => {};
