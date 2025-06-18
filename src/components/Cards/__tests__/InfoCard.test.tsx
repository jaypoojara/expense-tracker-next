import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import InfoCard from '../InfoCard';
import themeReducer from '@/store/slices/themeSlice';
import { FaWallet } from 'react-icons/fa';

// Create a test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: initialState,
  });
};

describe('InfoCard', () => {
  const defaultProps = {
    icon: <FaWallet data-testid="wallet-icon" />,
    label: 'Total Balance',
    value: 5000,
    bgColor: '#3B82F6',
  };

  const renderWithProvider = (component: React.ReactElement, initialState = {}) => {
    const store = createTestStore(initialState);
    return render(<Provider store={store}>{component}</Provider>);
  };

  it('renders with all props correctly', () => {
    renderWithProvider(<InfoCard {...defaultProps} />);
    
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
    expect(screen.getByText('₹5000')).toBeInTheDocument();
    expect(screen.getByTestId('wallet-icon')).toBeInTheDocument();
  });

  it('applies correct background color using inline style', () => {
    const { container } = renderWithProvider(<InfoCard {...defaultProps} />);
    const iconContainer = container.querySelector('[style*="background-color"]');
    
    expect(iconContainer).toHaveStyle({ backgroundColor: '#3B82F6' });
  });

  it('renders in light mode correctly', () => {
    const { container } = renderWithProvider(
      <InfoCard {...defaultProps} />,
      { theme: { mode: 'light' } }
    );
    
    const card = container.querySelector('.light');
    expect(card).toBeInTheDocument();
  });

  it('renders in dark mode correctly', () => {
    const { container } = renderWithProvider(
      <InfoCard {...defaultProps} />,
      { theme: { mode: 'dark' } }
    );
    
    const card = container.querySelector('.dark');
    expect(card).toBeInTheDocument();
  });

  it('formats currency value correctly', () => {
    renderWithProvider(<InfoCard {...defaultProps} value={10500.50} />);
    
    expect(screen.getByText('₹10500.5')).toBeInTheDocument();
  });

  it('handles zero value', () => {
    renderWithProvider(<InfoCard {...defaultProps} value={0} />);
    
    expect(screen.getByText('₹0')).toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = renderWithProvider(<InfoCard {...defaultProps} />);
    const card = container.firstChild;
    
    expect(card).toHaveClass('flex', 'gap-6', 'bg-white', 'p-6', 'rounded-2xl', 'border', 'border-gray-300');
  });
});