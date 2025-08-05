import React from 'react';
import { render, screen } from '@testing-library/react';
import Resume from '../../pages/Resume';
import { Portfolio } from '../../types';

// Mock the labelUtils
jest.mock('../../utils/labelUtils', () => ({
  __esModule: true,
  default: jest.fn((key: string) => {
    const labels: { [key: string]: string } = {
      'resume.education': 'Education',
      'resume.experience': 'Experience',
      'resume.skills': 'Skills'
    };
    return labels[key] || key;
  })
}));

const mockPortfolioData: Portfolio = {
  personalInfo: {
    name: 'John Doe',
    avatar: '/test-avatar.jpg',
    title: 'Software Developer',
    aboutMe: ['Passionate developer'],
    contacts: [],
    socials: []
  },
  services: [],
  technologies: [],
  expertiseAreas: [],
  skills: {
    technical: [
      { name: 'JavaScript', level: 90 },
      { name: 'React', level: 85 }
    ],
    soft: [
      { name: 'Communication', level: 80 },
      { name: 'Teamwork', level: 85 }
    ]
  },
  testimonials: [],
  resume: {
    education: [
      {
        timeframe: '2018-2022',
        degree: 'Computer Science',
        institution: 'University of Technology',
        description: 'Bachelor of Science in Computer Science'
      }
    ],
    experience: [
      {
        timeframe: '2022-Present',
        position: 'Frontend Developer',
        company: 'Tech Corp',
        description: 'Developing modern web applications'
      }
    ]
  },
  projects: []
};

describe('Resume Component', () => {
  it('renders resume content', () => {
    render(<Resume skills={mockPortfolioData.skills} resume={mockPortfolioData.resume} />);
    
    // Check that the resume component renders without crashing
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });

  it('renders education information', () => {
    render(<Resume skills={mockPortfolioData.skills} resume={mockPortfolioData.resume} />);
    
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('University of Technology')).toBeInTheDocument();
    expect(screen.getByText('2018-2022')).toBeInTheDocument();
  });

  it('renders experience information', () => {
    render(<Resume skills={mockPortfolioData.skills} resume={mockPortfolioData.resume} />);
    
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('2022-Present')).toBeInTheDocument();
  });

  it('renders skills information', () => {
    render(<Resume skills={mockPortfolioData.skills} resume={mockPortfolioData.resume} />);
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Communication')).toBeInTheDocument();
    expect(screen.getByText('Teamwork')).toBeInTheDocument();
  });

  it('handles empty resume data', () => {
    const emptySkills = {
      technical: [],
      soft: []
    };
    const emptyResume = {
      education: [],
      experience: []
    };
    
    render(<Resume skills={emptySkills} resume={emptyResume} />);
    
    // Should render without crashing even with empty data
    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
