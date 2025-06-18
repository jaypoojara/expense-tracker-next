import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ThemeToggle from '../ThemeToggle';
import themeReducer from '@/store/slices/themeSlice';

// Create a test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: initialState,
  });
};

describe('ThemeToggle', () => {
  const renderWithProvider = (initialState = {}) => {
    const store = createTestStore(initialState);
    return { 
      ...render(<Provider store={store}><ThemeToggle /></Provider>),
      store 
    };
  };

  it('renders in light mode by default', () => {
    renderWithProvider({ theme: { mode: 'light' } });
    
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.queryByText('Dark')).not.toBeInTheDocument();
    
    const checkbox = screen.getByRole('switch');
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('renders in dark mode when theme is dark', () => {
    renderWithProvider({ theme: { mode: 'dark' } });
    
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.queryByText('Light')).not.toBeInTheDocument();
    
    const checkbox = screen.getByRole('switch');
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('has correct accessibility attributes', () => {
    renderWithProvider({ theme: { mode: 'light' } });
    
    const checkbox = screen.getByRole('switch');
    expect(checkbox).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('toggles theme when clicked', () => {
    const { store } = renderWithProvider({ theme: { mode: 'light' } });
    
    const checkbox = screen.getByRole('switch');
    
    // Initial state
    expect(store.getState().theme.mode).toBe('light');
    
    // Click to toggle
    fireEvent.click(checkbox);
    
    // Check if theme changed
    expect(store.getState().theme.mode).toBe('dark');
  });

  it('updates aria-label when theme changes', () => {
    const { rerender } = renderWithProvider({ theme: { mode: 'light' } });
    
    const checkbox = screen.getByRole('switch');
    expect(checkbox).toHaveAttribute('aria-label', 'Switch to dark mode');
    
    // Simulate theme change
    const darkStore = createTestStore({ theme: { mode: 'dark' } });
    rerender(<Provider store={darkStore}><ThemeToggle /></Provider>);
    
    expect(checkbox).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('applies correct CSS classes for toggle switch', () => {
    const { container } = renderWithProvider({ theme: { mode: 'light' } });
    
    const toggleBackground = container.querySelector('.w-11.h-6');
    expect(toggleBackground).toHaveClass('bg-gray-300', 'rounded-full');
    
    const toggleDot = container.querySelector('.w-4.h-4');
    expect(toggleDot).toHaveClass('bg-white', 'rounded-full');
  });

  it('renders correct icon for light mode', () => {
    renderWithProvider({ theme: { mode: 'light' } });
    
    const sunIcon = document.querySelector('.text-yellow-500');
    expect(sunIcon).toBeInTheDocument();
  });

  it('renders correct icon for dark mode', () => {
    renderWithProvider({ theme: { mode: 'dark' } });
    
    const moonIcon = document.querySelector('.text-yellow-300');
    expect(moonIcon).toBeInTheDocument();
  });
});