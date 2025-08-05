import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// Mock the dataService
jest.mock('../services/dataService', () => ({
  fetchPortfolioData: jest.fn()
}));

// Mock the Main component
jest.mock('../pages/Main', () => {
  return function MockMain({ portfolio }: { portfolio: any }) {
    return <div>Main component with portfolio: {portfolio.personalInfo.name}</div>;
  };
});

const mockFetchPortfolioData = require('../services/dataService').fetchPortfolioData;

const mockPortfolioData = {
  personalInfo: {
    name: 'Test User',
    avatar: 'test-avatar.jpg',
    title: 'Test Developer',
    aboutMe: ['Test about me'],
    contacts: [],
    socials: []
  },
  services: [],
  technologies: [],
  expertiseAreas: [],
  skills: { technical: [], soft: [] },
  testimonials: [],
  resume: { education: [], experience: [] },
  projects: []
};

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders portfolio application', async () => {
    mockFetchPortfolioData.mockResolvedValue(mockPortfolioData);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Main component with portfolio: Test User/)).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    mockFetchPortfolioData.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message when data loading fails', async () => {
    mockFetchPortfolioData.mockRejectedValue(new Error('Network error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load portfolio data. Please try again later.')).toBeInTheDocument();
    });
  });

  it('shows no data message when portfolio is null', async () => {
    mockFetchPortfolioData.mockResolvedValue(null);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('No portfolio data available')).toBeInTheDocument();
    });
  });

  it('logs error when data loading fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const testError = new Error('Test error');
    mockFetchPortfolioData.mockRejectedValue(testError);

    render(<App />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error loading portfolio data:', testError);
    });

    consoleSpy.mockRestore();
  });
});
