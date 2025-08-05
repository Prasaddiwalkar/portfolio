import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/layout/Navbar';

// Mock the labelUtils
jest.mock('../../utils/labelUtils', () => ({
  __esModule: true,
  default: jest.fn((key: string) => {
    const labels: { [key: string]: string } = {
      'navbar.about': 'About',
      'navbar.resume': 'Resume'
    };
    return labels[key] || key;
  })
}));

describe('Navbar Component', () => {
  const mockSetActivePage = jest.fn();
  const defaultProps = {
    activePage: 'about',
    setActivePage: mockSetActivePage
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders navbar with available navigation items', () => {
    render(<Navbar {...defaultProps} />);
    
    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument();
    // Only About and Resume are implemented in the current navbar
  });

  it('highlights the active page', () => {
    render(<Navbar {...defaultProps} activePage="about" />);
    
    const aboutButton = screen.getByRole('button', { name: /about/i });
    expect(aboutButton).toHaveClass('active');
  });

  it('calls setActivePage when a nav item is clicked', () => {
    render(<Navbar {...defaultProps} />);
    
    const resumeButton = screen.getByRole('button', { name: /resume/i });
    fireEvent.click(resumeButton);
    
    expect(mockSetActivePage).toHaveBeenCalledWith('resume');
  });

  it('handles different active pages correctly', () => {
    render(<Navbar {...defaultProps} activePage="resume" />);
    
    const resumeButton = screen.getByRole('button', { name: /resume/i });
    const aboutButton = screen.getByRole('button', { name: /about/i });
    
    expect(resumeButton).toHaveClass('active');
    expect(aboutButton).not.toHaveClass('active');
  });

  it('renders correct icons for each nav item', () => {
    render(<Navbar {...defaultProps} />);
    
    const aboutIcon = screen.getByAltText('About');
    const resumeIcon = screen.getByAltText('Resume');
    
    expect(aboutIcon).toBeInTheDocument();
    expect(resumeIcon).toBeInTheDocument();
    expect(aboutIcon).toHaveAttribute('src', '/assets/images/icons/person-outline.svg');
    expect(resumeIcon).toHaveAttribute('src', '/assets/images/icons/document-text-outline.svg');
  });

  it('handles navigation clicks correctly', () => {
    render(<Navbar {...defaultProps} />);
    
    const resumeButton = screen.getByRole('button', { name: /resume/i });
    const aboutButton = screen.getByRole('button', { name: /about/i });
    
    fireEvent.click(resumeButton);
    expect(mockSetActivePage).toHaveBeenCalledWith('resume');
    
    fireEvent.click(aboutButton);
    expect(mockSetActivePage).toHaveBeenCalledWith('about');
    
    expect(mockSetActivePage).toHaveBeenCalledTimes(2);
  });
});
