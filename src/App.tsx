import React, { useEffect, useState } from 'react';
import { Portfolio } from './types';
import { fetchPortfolioData } from './services/dataService';
import Main from './components/Main';
import './style.css';
import './icon-styles.css';

const App: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPortfolioData();
        setPortfolio(data);
      } catch (err) {
        console.error('Error loading portfolio data:', err);
        setError('Failed to load portfolio data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!portfolio) {
    return <div className="error">No portfolio data available</div>;
  }

  return <Main portfolio={portfolio} />;
};

export default App;
