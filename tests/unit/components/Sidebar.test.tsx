import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../../components/layout/Sidebar';
import { PersonalInfo } from '../../types';

// Mock the labelUtils
jest.mock('../../utils/labelUtils', () => ({
  __esModule: true,
  default: jest.fn((key: string) => {
    const labels: { [key: string]: string } = {
      'sidebar.contacts': 'Contacts',
      'sidebar.socials': 'Social'
    };
    return labels[key] || key;
  })
}));

const mockPersonalInfo: PersonalInfo = {
  name: 'John Doe',
  avatar: '/test-avatar.jpg',
  title: 'Software Developer',
  aboutMe: ['Passionate developer', 'Tech enthusiast'],
  contacts: [
    {
      icon: '/icons/email.svg',
      title: 'Email',
      value: 'john@example.com',
      link: 'mailto:john@example.com'
    },
    {
      icon: '/icons/phone.svg',
      title: 'Phone',
      value: '+1234567890'
    }
  ],
  socials: [
    {
      platform: 'LinkedIn',
      icon: '/icons/linkedin.svg',
      url: 'https://linkedin.com/in/johndoe'
    },
    {
      platform: 'GitHub',
      icon: '/icons/github.svg',
      url: 'https://github.com/johndoe'
    }
  ]
};

describe('Sidebar Component', () => {
  beforeEach(() => {
    // Mock ResizeObserver
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders personal information correctly', () => {
    render(<Sidebar personalInfo={mockPersonalInfo} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toBeInTheDocument();
  });

  it('renders avatar with correct src', () => {
    render(<Sidebar personalInfo={mockPersonalInfo} />);
    
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toHaveAttribute('src', '/test-avatar.jpg');
  });

  it('renders contact information', () => {
    render(<Sidebar personalInfo={mockPersonalInfo} />);
    
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('+1234567890')).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Sidebar personalInfo={mockPersonalInfo} />);
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const githubLink = screen.getByRole('link', { name: /github/i });
    
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
  });

  it('renders personal info correctly', () => {
    render(<Sidebar personalInfo={mockPersonalInfo} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toHaveAttribute('src', '/test-avatar.jpg');
  });

  it('handles empty contacts array', () => {
    const personalInfoWithoutContacts = {
      ...mockPersonalInfo,
      contacts: []
    };
    
    render(<Sidebar personalInfo={personalInfoWithoutContacts} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    // Should still render the sidebar without crashing
  });

  it('handles empty socials array', () => {
    const personalInfoWithoutSocials = {
      ...mockPersonalInfo,
      socials: []
    };
    
    render(<Sidebar personalInfo={personalInfoWithoutSocials} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    // Should still render the sidebar without crashing
  });
});
