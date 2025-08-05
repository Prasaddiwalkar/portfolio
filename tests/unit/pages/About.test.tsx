import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from '../../pages/About';
import { PersonalInfo, Service, Technology, ExpertiseArea } from '../../types';

// Mock the labelUtils module
jest.mock('../../utils/labelUtils', () => ({
  __esModule: true,
  default: jest.fn((key: string, defaultValue: string = '') => {
    const labels: { [key: string]: string } = {
      'about.title': 'About me',
      'about.whatImDoing': "What i'm doing",
      'about.areasOfExpertise': 'Areas of Expertise',
      'about.technologies': 'Technologies',
    };
    return labels[key] || defaultValue;
  })
}));

describe('About Page', () => {
  const mockPersonalInfo: PersonalInfo = {
    name: 'Test User',
    avatar: '/test-avatar.jpg',
    title: 'Test Title',
    aboutMe: [
      'This is the first paragraph about me.',
      'This is the second paragraph about me.'
    ],
    contacts: [
      {
        icon: '/test-icon.svg',
        titleKey: 'contacts.email',
        value: 'test@example.com',
        link: 'mailto:test@example.com'
      }
    ],
    socials: [
      {
        platform: 'LinkedIn',
        icon: '/linkedin-icon.svg',
        url: 'https://linkedin.com/in/testuser'
      }
    ]
  };

  const mockServices: Service[] = [
    {
      icon: '/service-icon.svg',
      title: 'Web Development',
      description: 'Building modern web applications'
    },
    {
      icon: '/service-icon2.svg',
      title: 'Mobile Development',
      description: 'Creating mobile applications'
    }
  ];

  const mockTechnologies: Technology[] = [
    {
      icon: '/tech-icon.svg',
      name: 'React',
      title: 'Frontend Framework'
    },
    {
      icon: '/tech-icon2.svg',
      name: 'Node.js',
      title: 'Backend Runtime'
    }
  ];

  const mockExpertiseAreas: ExpertiseArea[] = [
    {
      name: 'Full Stack Development',
      achievement: '5+ years experience'
    },
    {
      name: 'Cloud Architecture',
      achievement: 'AWS Certified'
    }
  ];

  const mockProps = {
    personalInfo: mockPersonalInfo,
    services: mockServices,
    technologies: mockTechnologies,
    expertiseAreas: mockExpertiseAreas
  };

  test('renders personal information', () => {
    render(<About {...mockProps} />);
    
    expect(screen.getByText('This is the first paragraph about me.')).toBeInTheDocument();
    expect(screen.getByText('This is the second paragraph about me.')).toBeInTheDocument();
  });

  test('renders services section', () => {
    render(<About {...mockProps} />);
    
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Building modern web applications')).toBeInTheDocument();
  });

  test('renders technologies section', () => {
    render(<About {...mockProps} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  test('renders expertise areas', () => {
    render(<About {...mockProps} />);
    
    expect(screen.getByText('Full Stack Development')).toBeInTheDocument();
  });

  test('handles empty services array', () => {
    const propsWithoutServices = {
      ...mockProps,
      services: [],
    };

    render(<About {...propsWithoutServices} />);
    
    // Should still render other sections
    expect(screen.getByText('This is the first paragraph about me.')).toBeInTheDocument();
  });

  test('handles empty technologies array', () => {
    const propsWithoutTechnologies = {
      ...mockProps,
      technologies: [],
    };

    render(<About {...propsWithoutTechnologies} />);
    
    // Should still render other sections
    expect(screen.getByText('This is the first paragraph about me.')).toBeInTheDocument();
  });

  test('renders tooltip interactions', () => {
    render(<About {...mockProps} />);
    
    // Find technology items with tooltips
    const reactTech = screen.getByText('React');
    
    // Simulate mouse enter and leave events
    fireEvent.mouseEnter(reactTech);
    fireEvent.mouseLeave(reactTech);
    
    expect(reactTech).toBeInTheDocument();
  });

  test('renders all section titles with labels', () => {
    render(<About {...mockProps} />);
    
    expect(screen.getByText('About me')).toBeInTheDocument();
    expect(screen.getByText("What i'm doing")).toBeInTheDocument();
    expect(screen.getByText('Areas of Expertise')).toBeInTheDocument();
    expect(screen.getByText('Technologies')).toBeInTheDocument();
  });

  test('renders service icons with correct attributes', () => {
    render(<About {...mockProps} />);
    
    const webDevIcon = screen.getByAltText('Web Development icon');
    expect(webDevIcon).toHaveAttribute('src', '/service-icon.svg');
    expect(webDevIcon).toHaveAttribute('width', '40');
  });

  test('renders technology icons with correct attributes', () => {
    render(<About {...mockProps} />);
    
    const reactIcon = screen.getByAltText('React');
    expect(reactIcon).toHaveAttribute('src', '/tech-icon.svg');
  });

  test('handles expertise areas with achievements', () => {
    render(<About {...mockProps} />);
    
    expect(screen.getByText('Full Stack Development')).toBeInTheDocument();
    expect(screen.getByText('5+ years experience')).toBeInTheDocument();
    expect(screen.getByText('AWS Certified')).toBeInTheDocument();
  });

  test('handles empty expertise areas', () => {
    const propsWithoutExpertise = {
      ...mockProps,
      expertiseAreas: [],
    };

    render(<About {...propsWithoutExpertise} />);
    
    // Should still render other sections
    expect(screen.getByText('This is the first paragraph about me.')).toBeInTheDocument();
  });

  test('handles empty about me paragraphs', () => {
    const propsWithoutAboutMe = {
      ...mockProps,
      personalInfo: {
        ...mockPersonalInfo,
        aboutMe: []
      }
    };

    render(<About {...propsWithoutAboutMe} />);
    
    // Should still render section titles
    expect(screen.getByText('About me')).toBeInTheDocument();
  });

  test('renders main article with correct data attributes', () => {
    render(<About {...mockProps} />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveClass('about');
    expect(article).toHaveClass('active');
    expect(article).toHaveAttribute('data-page', 'about');
  });

  test('handles mouse events on technology items', () => {
    render(<About {...mockProps} />);
    
    // Test mouse enter and leave on technology items
    const techItems = screen.getAllByText(/React|Node\.js/);
    
    techItems.forEach(item => {
      fireEvent.mouseEnter(item);
      fireEvent.mouseLeave(item);
    });
    
    expect(techItems.length).toBeGreaterThan(0);
  });

  test('handles technologies with title and without title', () => {
    const technologiesWithAndWithoutTitle: Technology[] = [
      {
        icon: '/tech-icon.svg',
        name: 'React',
        title: 'Frontend Framework'
      },
      {
        icon: '/tech-icon2.svg',
        name: 'Node.js'
        // No title property
      }
    ];

    const propsWithMixedTechnologies = {
      ...mockProps,
      technologies: technologiesWithAndWithoutTitle
    };

    render(<About {...propsWithMixedTechnologies} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  test('handles expertise areas without achievements', () => {
    const expertiseWithoutAchievement: ExpertiseArea[] = [
      {
        name: 'Full Stack Development',
        achievement: '5+ years experience'
      },
      {
        name: 'DevOps'
        // No achievement property
      }
    ];

    const propsWithMixedExpertise = {
      ...mockProps,
      expertiseAreas: expertiseWithoutAchievement
    };

    render(<About {...propsWithMixedExpertise} />);
    
    expect(screen.getByText('Full Stack Development')).toBeInTheDocument();
    expect(screen.getByText('DevOps')).toBeInTheDocument();
    expect(screen.getByText('5+ years experience')).toBeInTheDocument();
  });
});
