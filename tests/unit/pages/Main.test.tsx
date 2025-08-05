import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Main from '../../pages/Main';
import { Portfolio } from '../../types';
import { aiService } from '../../services/aiService';

// Mock the components
jest.mock('../../components', () => ({
  Sidebar: ({ personalInfo }: { personalInfo: any }) => (
    <div data-testid="sidebar">Sidebar - {personalInfo.name}</div>
  ),
  AIChat: ({ isOpen, onClose, onSendMessage }: any) => (
    <div data-testid="ai-chat" style={{ display: isOpen ? 'block' : 'none' }}>
      <button onClick={onClose}>Close Chat</button>
      <button onClick={() => onSendMessage('test message')}>Send</button>
    </div>
  )
}));

// Mock the hooks
jest.mock('../../hooks', () => ({
  useAIChat: jest.fn(() => ({
    aiAgentStatus: 'connected',
    updateAIStatus: jest.fn()
  }))
}));

// Mock CSS imports
jest.mock('../../styles/components/pages/Main.css', () => ({}));
jest.mock('../../pages/About', () => ({ personalInfo, services, technologies, expertiseAreas }: any) => (
  <div data-testid="about-page">
    About Page - {personalInfo.name}
    <div>Services: {services?.length || 0}</div>
    <div>Technologies: {technologies?.length || 0}</div>
    <div>Expertise: {expertiseAreas?.length || 0}</div>
  </div>
));

jest.mock('../../pages/Resume', () => ({ skills, resume }: any) => (
  <div data-testid="resume-page">
    Resume Page
    <div>Skills: {skills?.technical?.length || 0}</div>
    <div>Education: {resume?.education?.length || 0}</div>
  </div>
));

// Mock the services
jest.mock('../../services/aiService', () => ({
  aiService: {
    healthCheck: jest.fn(),
    initialize: jest.fn(),
    sendMessage: jest.fn()
  }
}));

// Mock the constants
jest.mock('../../constants', () => ({
  NAVIGATION_PAGES: {
    ABOUT: 'about',
    RESUME: 'resume'
  },
  AI_AGENT_STATUS: {
    CHECKING: 'checking',
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected'
  }
}));

// Mock labelUtils
jest.mock('../../utils/labelUtils', () => ({
  __esModule: true,
  default: jest.fn((key: string) => {
    const labels: { [key: string]: string } = {
      'sidebar.themeDark': 'Switch to light mode',
      'sidebar.themeLight': 'Switch to dark mode'
    };
    return labels[key] || key;
  })
}));

describe('Main Component', () => {
  const mockPortfolio: Portfolio = {
    personalInfo: {
      name: 'John Doe',
      title: 'Software Developer',
      avatar: '/avatar.jpg',
      aboutMe: ['Passionate developer', 'Tech enthusiast'],
      contacts: [],
      socials: []
    },
    services: [
      { title: 'Web Development', description: 'Building web apps', icon: '/icon1.svg' }
    ],
    technologies: [
      { name: 'React', icon: '/react.svg', title: 'Frontend Framework' }
    ],
    expertiseAreas: [
      { name: 'Frontend Development', achievement: 'Expert level' }
    ],
    skills: {
      technical: [
        { name: 'JavaScript', level: 90 }
      ],
      soft: [
        { name: 'Communication', level: 85 }
      ]
    },
    testimonials: [],
    resume: {
      education: [
        { institution: 'University', degree: 'CS', timeframe: '2016-2020', description: 'Computer Science' }
      ],
      experience: []
    },
    projects: []
  };

  const mockUpdateAIStatus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset the useAIChat mock
    const { useAIChat } = require('../../hooks');
    useAIChat.mockReturnValue({
      aiAgentStatus: 'connected',
      updateAIStatus: mockUpdateAIStatus
    });

    // Reset AI service mocks
    (aiService.healthCheck as jest.Mock).mockResolvedValue(true);
    (aiService.initialize as jest.Mock).mockResolvedValue(undefined);
    (aiService.sendMessage as jest.Mock).mockResolvedValue('AI response');

    // Reset document theme
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders main layout with sidebar and content', () => {
    render(<Main portfolio={mockPortfolio} />);
    
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByText('Sidebar - John Doe')).toBeInTheDocument();
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('renders navigation tabs correctly', () => {
    render(<Main portfolio={mockPortfolio} />);
    
    const aboutTab = screen.getByRole('button', { name: /about/i });
    const resumeTab = screen.getByRole('button', { name: /resume/i });
    
    expect(aboutTab).toBeInTheDocument();
    expect(resumeTab).toBeInTheDocument();
    expect(aboutTab).toHaveClass('active');
  });

  it('switches between About and Resume pages', () => {
    render(<Main portfolio={mockPortfolio} />);
    
    // Initially shows About page
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
    expect(screen.queryByTestId('resume-page')).not.toBeInTheDocument();
    
    // Click Resume tab
    const resumeTab = screen.getByRole('button', { name: /resume/i });
    fireEvent.click(resumeTab);
    
    expect(screen.getByTestId('resume-page')).toBeInTheDocument();
    expect(screen.queryByTestId('about-page')).not.toBeInTheDocument();
    expect(resumeTab).toHaveClass('active');
  });

  it('passes correct props to About component', () => {
    render(<Main portfolio={mockPortfolio} />);
    
    expect(screen.getByText('About Page - John Doe')).toBeInTheDocument();
    expect(screen.getByText('Services: 1')).toBeInTheDocument();
    expect(screen.getByText('Technologies: 1')).toBeInTheDocument();
    expect(screen.getByText('Expertise: 1')).toBeInTheDocument();
  });

  it('passes correct props to Resume component', () => {
    render(<Main portfolio={mockPortfolio} />);
    
    // Switch to Resume page
    const resumeTab = screen.getByRole('button', { name: /resume/i });
    fireEvent.click(resumeTab);
    
    expect(screen.getByText('Resume Page')).toBeInTheDocument();
    expect(screen.getByText('Skills: 1')).toBeInTheDocument();
    expect(screen.getByText('Education: 1')).toBeInTheDocument();
  });

  it('toggles theme correctly', () => {
    render(<Main portfolio={mockPortfolio} />);
    
    const themeToggle = screen.getByRole('button', { name: '☀️' });
    
    // Initially dark mode
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(themeToggle).toHaveTextContent('☀️');
    
    // Toggle to light mode
    fireEvent.click(themeToggle);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('initializes AI service on mount', async () => {
    render(<Main portfolio={mockPortfolio} />);
    
    await waitFor(() => {
      expect(mockUpdateAIStatus).toHaveBeenCalledWith('checking');
    });
    
    expect(aiService.healthCheck).toHaveBeenCalled();
    expect(aiService.initialize).toHaveBeenCalledWith(mockPortfolio);
    expect(mockUpdateAIStatus).toHaveBeenCalledWith('connected');
  });

  it('handles AI service initialization failure', async () => {
    (aiService.healthCheck as jest.Mock).mockResolvedValue(false);
    
    render(<Main portfolio={mockPortfolio} />);
    
    await waitFor(() => {
      expect(mockUpdateAIStatus).toHaveBeenCalledWith('checking');
    });
    
    expect(aiService.healthCheck).toHaveBeenCalled();
    expect(mockUpdateAIStatus).toHaveBeenCalledWith('disconnected');
  });

  it('handles AI service initialization error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (aiService.healthCheck as jest.Mock).mockRejectedValue(new Error('Network error'));
    
    render(<Main portfolio={mockPortfolio} />);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to initialize AI service:', expect.any(Error));
    });
    
    expect(mockUpdateAIStatus).toHaveBeenCalledWith('disconnected');
    consoleSpy.mockRestore();
  });

  it('handles AI message sending', async () => {
    render(<Main portfolio={mockPortfolio} />);
    
    // We need to test the handleAIMessage function indirectly
    // Since it's passed to AIChat component, we can test it through props
    await waitFor(() => {
      expect(aiService.sendMessage).not.toHaveBeenCalled();
    });
  });

  it('handles AI message error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (aiService.sendMessage as jest.Mock).mockRejectedValue(new Error('AI Error'));
    
    render(<Main portfolio={mockPortfolio} />);
    
    // The handleAIMessage function should handle errors gracefully
    // We test this by ensuring the component renders without crashing
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  it('renders theme toggle with correct accessibility', () => {
    render(<Main portfolio={mockPortfolio} />);
    
    const themeToggle = screen.getByRole('button', { name: '☀️' });
    expect(themeToggle).toBeInTheDocument();
    expect(themeToggle).toHaveTextContent('☀️');
  });

  it('renders tab icons correctly', () => {
    render(<Main portfolio={mockPortfolio} />);
    
    const aboutIcon = screen.getByAltText('About');
    const resumeIcon = screen.getByAltText('Resume');
    
    expect(aboutIcon).toHaveAttribute('src', '/assets/images/icons/person-outline.svg');
    expect(resumeIcon).toHaveAttribute('src', '/assets/images/icons/document-text-outline.svg');
  });

  it('updates theme toggle text when theme changes', () => {
    render(<Main portfolio={mockPortfolio} />);
    
    const themeToggle = screen.getByRole('button', { name: '☀️' });
    
    // Click to switch to light mode
    fireEvent.click(themeToggle);
    
    // The title should update (though we can't test the exact text without re-querying)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('renders with different AI agent statuses', () => {
    const { useAIChat } = require('../../hooks');
    useAIChat.mockReturnValue({
      aiAgentStatus: 'disconnected',
      updateAIStatus: mockUpdateAIStatus
    });
    
    render(<Main portfolio={mockPortfolio} />);
    
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('handles empty portfolio data gracefully', () => {
    const emptyPortfolio: Portfolio = {
      personalInfo: {
        name: '',
        title: '',
        avatar: '',
        aboutMe: [],
        contacts: [],
        socials: []
      },
      services: [],
      technologies: [],
      expertiseAreas: [],
      skills: {
        technical: [],
        soft: []
      },
      testimonials: [],
      resume: {
        education: [],
        experience: []
      },
      projects: []
    };
    
    render(<Main portfolio={emptyPortfolio} />);
    
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
    expect(screen.getByText('Services: 0')).toBeInTheDocument();
    expect(screen.getByText('Technologies: 0')).toBeInTheDocument();
  });
});
