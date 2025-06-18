import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import themeReducer from '@/store/slices/themeSlice';

// This type interface extends the default options for render from RTL
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
}

// Create a custom render function that includes providers
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      theme: { theme: 'light' },
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        theme: themeReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): React.JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Mock data generators for tests
export const mockChartData = {
  pieChart: [
    { name: 'Category 1', amount: 1000, fill: '#FF6384' },
    { name: 'Category 2', amount: 2000, fill: '#36A2EB' },
    { name: 'Category 3', amount: 1500, fill: '#FFCE56' },
  ],
  lineChart: [
    { month: 'Jan', amount: 1000 },
    { month: 'Feb', amount: 1500 },
    { month: 'Mar', amount: 1200 },
  ],
  barChart: [
    { date: '01', amount: 500 },
    { date: '02', amount: 700 },
    { date: '03', amount: 600 },
  ],
};

// Re-export everything
export * from '@testing-library/react';
export { renderWithProviders as render };