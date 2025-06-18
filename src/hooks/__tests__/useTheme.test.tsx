import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import useTheme from '../useTheme';
import themeReducer from '@/store/slices/themeSlice';
import { PropsWithChildren } from 'react';

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: initialState,
  });
};

describe('useTheme hook', () => {
  const wrapper = ({ children, initialState = {} }: PropsWithChildren<{ initialState?: Record<string, unknown> }>) => {
    const store = createTestStore(initialState);
    return <Provider store={store}>{children}</Provider>;
  };

  it('returns current theme state', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => wrapper({ children, initialState: { theme: { mode: 'light' } } }),
    });

    expect(result.current.mode).toBe('light');
    expect(result.current.isDarkMode).toBe(false);
  });

  it('correctly identifies dark mode', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => wrapper({ children, initialState: { theme: { mode: 'dark' } } }),
    });

    expect(result.current.mode).toBe('dark');
    expect(result.current.isDarkMode).toBe(true);
  });

  it('toggles theme when changeTheme is called', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => wrapper({ children, initialState: { theme: { mode: 'light' } } }),
    });

    expect(result.current.mode).toBe('light');

    act(() => {
      result.current.changeTheme();
    });

    expect(result.current.mode).toBe('dark');
    expect(result.current.isDarkMode).toBe(true);
  });

  it('toggles back to light mode', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => wrapper({ children, initialState: { theme: { mode: 'dark' } } }),
    });

    expect(result.current.mode).toBe('dark');

    act(() => {
      result.current.changeTheme();
    });

    expect(result.current.mode).toBe('light');
    expect(result.current.isDarkMode).toBe(false);
  });

});