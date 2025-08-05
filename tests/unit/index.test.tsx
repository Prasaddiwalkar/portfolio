import React from 'react';
import ReactDOM from 'react-dom/client';

// Mock ReactDOM
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn()
  }))
}));

// Mock App component
jest.mock('../App', () => {
  return function MockApp() {
    return <div data-testid="app">App Component</div>;
  };
});

// Mock reportWebVitals
jest.mock('../reportWebVitals', () => jest.fn());

// Mock CSS import
jest.mock('../styles/index.css', () => ({}));

describe('index.tsx', () => {
  let mockCreateRoot: jest.Mock;
  let mockRender: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set up DOM element
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    // Mock DOM methods
    jest.spyOn(document, 'getElementById').mockReturnValue(rootElement);

    mockRender = jest.fn();
    mockCreateRoot = jest.fn(() => ({ render: mockRender }));
    (ReactDOM.createRoot as jest.Mock) = mockCreateRoot;
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.restoreAllMocks();
  });

  it('renders the app in React.StrictMode', () => {
    // Import the index file to trigger the rendering
    require('../index');

    expect(document.getElementById).toHaveBeenCalledWith('root');
    expect(mockCreateRoot).toHaveBeenCalledWith(expect.any(HTMLElement));
    expect(mockRender).toHaveBeenCalledWith(
      expect.objectContaining({
        type: React.StrictMode,
        props: {
          children: expect.objectContaining({
            type: expect.any(Function) // App component
          })
        }
      })
    );
  });

  it('calls reportWebVitals', () => {
    const reportWebVitals = require('../reportWebVitals');
    
    // Re-import to trigger the call
    require('../index');

    expect(reportWebVitals).toHaveBeenCalled();
  });
});
