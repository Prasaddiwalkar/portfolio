import { useEffect } from 'react';

/**
 * Custom hook to dynamically update the document title
 * @param title - The title to set
 * @param fallback - Fallback title if the main title is empty
 */
export const useDocumentTitle = (title?: string, fallback: string = 'Portfolio') => {
  useEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = fallback;
    }

    // Cleanup function to reset title when component unmounts (optional)
    return () => {
      document.title = fallback;
    };
  }, [title, fallback]);
};

/**
 * Hook specifically for portfolio title formatting
 * @param portfolioName - Name from portfolio data
 */
export const usePortfolioTitle = (portfolioName?: string) => {
  const title = portfolioName ? `${portfolioName} - Portfolio` : undefined;
  useDocumentTitle(title, 'Portfolio - Loading...');
};
