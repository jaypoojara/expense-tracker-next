import themeReducer, { toggleTheme } from '../slices/themeSlice';

describe('themeSlice', () => {
  it('should return the initial state', () => {
    const initialState = themeReducer(undefined, { type: 'unknown' });
    expect(initialState).toEqual({ mode: 'light' });
  });

  it('should handle toggleTheme from light to dark', () => {
    const previousState = { mode: 'light' as const };
    const newState = themeReducer(previousState, toggleTheme());
    expect(newState).toEqual({ mode: 'dark' });
  });

  it('should handle toggleTheme from dark to light', () => {
    const previousState = { mode: 'dark' as const };
    const newState = themeReducer(previousState, toggleTheme());
    expect(newState).toEqual({ mode: 'light' });
  });

  it('should handle multiple toggles', () => {
    let state = { mode: 'light' as 'light' | 'dark' };
    
    // First toggle: light -> dark
    state = themeReducer(state, toggleTheme());
    expect(state.mode).toBe('dark');
    
    // Second toggle: dark -> light
    state = themeReducer(state, toggleTheme());
    expect(state.mode).toBe('light');
    
    // Third toggle: light -> dark
    state = themeReducer(state, toggleTheme());
    expect(state.mode).toBe('dark');
  });

  it('should not mutate the original state', () => {
    const originalState = { mode: 'light' as const };
    const stateCopy = { ...originalState };
    
    themeReducer(originalState, toggleTheme());
    
    expect(originalState).toEqual(stateCopy);
  });
});