import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>No error</div>;
};

// Suppress console.error for these tests
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Failed to load chart')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom error message</div>}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.queryByText('Failed to load chart')).not.toBeInTheDocument();
  });

  it('logs error to console', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(console.error).toHaveBeenCalledWith(
      'Chart Error:',
      expect.any(Error),
      expect.any(Object)
    );
  });

  it('renders default message when error has no message', () => {
    const ThrowEmptyError = () => {
      throw new Error('');
    };
    
    render(
      <ErrorBoundary>
        <ThrowEmptyError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
  });

  it('does not recover when error is fixed in same component instance', () => {
    // Note: ErrorBoundary doesn't automatically recover from errors.
    // Once an error is caught, the component stays in error state
    // unless it's unmounted and remounted.
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Failed to load chart')).toBeInTheDocument();
    
    // Re-render without error - ErrorBoundary will still show error
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );
    
    // ErrorBoundary maintains its error state
    expect(screen.getByText('Failed to load chart')).toBeInTheDocument();
    expect(screen.queryByText('No error')).not.toBeInTheDocument();
  });
});