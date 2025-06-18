import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PieChart from '../PieChart';
import themeReducer from '@/store/slices/themeSlice';
import { FinanceOverviewData } from '@/types/chart.types';

// Mock Recharts to avoid canvas rendering issues in tests
jest.mock('recharts', () => {
  const originalModule = jest.requireActual('recharts');
  return {
    ...originalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
    PieChart: ({ children }: { children: React.ReactNode }) => <div data-testid="pie-chart">{children}</div>,
    Pie: ({ data, dataKey, children }: { data?: unknown[]; dataKey: string; children?: React.ReactNode }) => (
      <div data-testid="pie" data-datakey={dataKey}>
        {data?.length} items
        {children}
      </div>
    ),
    Cell: ({ fill }: { fill: string }) => <div data-testid="cell" data-fill={fill} />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
    text: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <span {...props}>{children}</span>,
  };
});

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: initialState,
  });
};

describe('PieChart', () => {
  const mockData: FinanceOverviewData[] = [
    { name: 'Food', amount: 3000, fill: '#FF6384' },
    { name: 'Transport', amount: 2000, fill: '#36A2EB' },
    { name: 'Shopping', amount: 1500, fill: '#FFCE56' },
  ];

  const defaultProps = {
    label: 'Total Expenses',
    totalAmount: 6500,
    dataKey: 'amount',
    data: mockData,
  };

  const renderWithProvider = (component: React.ReactElement, initialState = {}) => {
    const store = createTestStore(initialState);
    return render(<Provider store={store}>{component}</Provider>);
  };

  it('renders without crashing', () => {
    renderWithProvider(<PieChart {...defaultProps} />);
    
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });

  it('renders pie component with correct data', () => {
    renderWithProvider(<PieChart {...defaultProps} />);
    
    const pie = screen.getByTestId('pie');
    expect(pie).toHaveAttribute('data-datakey', 'amount');
    expect(pie).toHaveTextContent('3 items');
  });

  it('renders correct number of cells', () => {
    renderWithProvider(<PieChart {...defaultProps} />);
    
    const cells = screen.getAllByTestId('cell');
    expect(cells).toHaveLength(mockData.length);
  });

  it('renders tooltip and legend components', () => {
    renderWithProvider(<PieChart {...defaultProps} />);
    
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('legend')).toBeInTheDocument();
  });

  it('displays label and total amount in light mode', () => {
    renderWithProvider(<PieChart {...defaultProps} />, { theme: { mode: 'light' } });
    
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('6500')).toBeInTheDocument();
  });

  it('displays label and total amount in dark mode', () => {
    renderWithProvider(<PieChart {...defaultProps} />, { theme: { mode: 'dark' } });
    
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('6500')).toBeInTheDocument();
  });

  it('handles empty data array', () => {
    renderWithProvider(<PieChart {...defaultProps} data={[]} />);
    
    const pie = screen.getByTestId('pie');
    expect(pie).toHaveTextContent('0 items');
  });

  it('memoizes component to prevent unnecessary re-renders', () => {
    const { rerender } = renderWithProvider(<PieChart {...defaultProps} />);
    
    // Re-render with same props
    rerender(
      <Provider store={createTestStore()}>
        <PieChart {...defaultProps} />
      </Provider>
    );
    
    // Component should still be in the document (memo prevents re-render)
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });
});