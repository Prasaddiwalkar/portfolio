import { Portfolio } from '../types';
import localData from '../data/portfolioData.json';

// This service fetches the portfolio data from local data
export const fetchPortfolioData = async (): Promise<Portfolio> => {
  // Use local data directly
  return localData as Portfolio;
}; 