import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ChartWrapper from '../ChartWrapper';
import themeReducer from '@/store/slices/themeSlice';

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: initialState,
  });
};

describe('ChartWrapper', () => {
  const renderWithProvider = (component: React.ReactElement, initialState = {}) => {
    const store = createTestStore(initialState);
    return render(<Provider store={store}>{component}</Provider>);
  };

  it('renders title and children correctly', () => {
    renderWithProvider(
      <ChartWrapper title="Monthly Expenses">
        <div data-testid="chart-content">Chart goes here</div>
      </ChartWrapper>
    );
    
    expect(screen.getByText('Monthly Expenses')).toBeInTheDocument();
    expect(screen.getByTestId('chart-content')).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    renderWithProvider(
      <ChartWrapper title="Test Chart" isLoading={true}>
        <div>Should not be visible</div>
      </ChartWrapper>
    );
    
    expect(screen.queryByText('Should not be visible')).not.toBeInTheDocument();
    
    // Check for loading animation
    const loadingElement = document.querySelector('.animate-pulse');
    expect(loadingElement).toBeInTheDocument();
  });

  it('shows error state when error is provided', () => {
    const error = new Error('Failed to fetch data');
    renderWithProvider(
      <ChartWrapper title="Test Chart" error={error}>
        <div>Should not be visible</div>
      </ChartWrapper>
    );
    
    expect(screen.getByText('Failed to load chart')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
    expect(screen.queryByText('Should not be visible')).not.toBeInTheDocument();
  });

  it('renders children wrapped in ErrorBoundary when no loading or error', () => {
    renderWithProvider(
      <ChartWrapper title="Test Chart">
        <div data-testid="chart-content">Chart content</div>
      </ChartWrapper>
    );
    
    expect(screen.getByTestId('chart-content')).toBeInTheDocument();
  });

  it('applies dark mode class when theme is dark', () => {
    const { container } = renderWithProvider(
      <ChartWrapper title="Test Chart">
        <div>Content</div>
      </ChartWrapper>,
      { theme: { mode: 'dark' } }
    );
    
    const wrapper = container.querySelector('.card');
    expect(wrapper).toHaveClass('dark');
  });

  it('applies light mode class when theme is light', () => {
    const { container } = renderWithProvider(
      <ChartWrapper title="Test Chart">
        <div>Content</div>
      </ChartWrapper>,
      { theme: { mode: 'light' } }
    );
    
    const wrapper = container.querySelector('.card');
    expect(wrapper).toHaveClass('light');
  });

  it('maintains consistent height for loading state', () => {
    const { container } = renderWithProvider(
      <ChartWrapper title="Test Chart" isLoading={true}>
        <div>Content</div>
      </ChartWrapper>
    );
    
    const loadingContainer = container.querySelector('.h-\\[380px\\]');
    expect(loadingContainer).toBeInTheDocument();
  });

  it('maintains consistent height for error state', () => {
    const { container } = renderWithProvider(
      <ChartWrapper title="Test Chart" error={new Error('Test error')}>
        <div>Content</div>
      </ChartWrapper>
    );
    
    const errorContainer = container.querySelector('.h-\\[380px\\]');
    expect(errorContainer).toBeInTheDocument();
  });
});